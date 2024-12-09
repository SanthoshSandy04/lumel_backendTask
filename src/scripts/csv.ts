import path from "path";
import csvParser from "csv-parser";

import { createReadStream } from "fs";
import { models } from "../models/index";
import { Op } from "sequelize";

const filePath = path.resolve(__dirname, "../../lumel.csv");

export const readCsv = (filePath: string): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    try {
      const response: any[] = [];
      createReadStream(filePath)
        .pipe(csvParser())
        .on("data", (data) => {
          // Do something with each row of data
          response.push(data);
        })
        .on("end", () => {
          // All rows have been read
          resolve(response);
        });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

async function csvScript() {
  const csvData = await readCsv(filePath);
  const record = csvData?.map((i) => {
    return {
      order_id: i["Order ID"],
      product_id: i["Product ID"],
      customer_id: i["Customer ID"],
      product_name: i["Product Name"],
      category: i["Category"],
      region: i["Region"],
      date_of_sale: i["Date of Sale"],
      quantity: i["Quantity Sold"],
      unit_price: i["Unit Price"],
      discount_amount: i["Discount"],
      shipping_cost: i["Shipping Cost"],
      payment_method: i["Payment Method"],
      customer_name: i["Customer Name"],
      customer_email: i["Customer Email"],
      customer_address: i["Customer Address"],
    };
  });
  console.log("record:", record);
  if (record?.length > 0) {
    for (const item of record) {
      let category = await models.product_category.findAll({
        where: {
          category: { [Op.iLike]: `%${item?.category}%` },
        },
        limit: 1,
      });
      category = JSON.parse(JSON.stringify(category));
      let category_id: any;

      if (category?.length === 0) {
        await models.product_category
          .create({
            category: item?.category,
          })
          .then((res) => {
            let response = JSON.parse(JSON.stringify(res));
            category_id = response?.id;
          });
      } else {
        category_id = category[0]?.id;
      }

      let product = await models.product.findByPk(item.product_id);
      product = JSON.parse(JSON.stringify(product));
      let product_id;
      if (!product) {
        await models.product
          .create({
            id: item?.product_id,
            product_name: item?.product_name,
            category_id: category_id,
            unit_price: Number(item?.unit_price),
            is_active: true,
            created_at: new Date(),
            updated_at: new Date(),
          })
          .then((res) => {
            let response = JSON.parse(JSON.stringify(res));
            product_id = response?.id;
          });
      } else {
        product_id = product?.id;
      }

      let customer = await models.customer.findByPk(item?.customer_id);
      customer = JSON.parse(JSON.stringify(customer));
      let customer_id: any;
      if (!customer) {
        await models.customer
          .create({
            id: item?.customer_id,
            customer_name: item?.customer_name,
            customer_email_id: item?.customer_email,
            customer_address: item?.customer_address,
            is_active: true,
          })
          .then((res) => {
            let response = JSON.parse(JSON.stringify(res));
            customer_id = response?.id;
          });
      } else {
        customer_id = customer?.id;
      }

      let paymentMethod = await models.payment_method.findAll({
        where: {
          method: { [Op.iLike]: `%${item?.payment_method}%` },
        },
        limit: 1,
      });

      paymentMethod = JSON.parse(JSON.stringify(paymentMethod));

      let paymentType: any;

      if (paymentMethod?.length === 0) {
        await models.payment_method
          .create({
            method: item?.payment_method,
            is_active: true,
          })
          .then((res) => {
            let response = JSON.parse(JSON.stringify(res));
            paymentType = response.id;
          });
      } else {
        paymentType = paymentMethod[0].id;
      }

      await models.order.create({
        id: item?.order_id,
        product_id: product_id,
        customer_id: customer_id,
        payment_type: paymentType,
        quantity: item?.quantity,
        unit_price: item?.unit_price,
        discount_amount: item?.discount_amount,
        date_of_sale: item?.date_of_sale,
        shipping_cost: item?.shipping_cost,
        total_price:
          item?.quantity * item?.unit_price -
          item?.discount_amount +
          item?.shipping_cost,
        region: item?.region,
        is_active: true,
      });
    }
  }
}

csvScript();
