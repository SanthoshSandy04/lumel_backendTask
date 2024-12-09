import { sequelize } from "models";
import { codeSuccess } from "utils/codeMessages";
import { success } from "utils/messages";

async function GetRevenue({
  fromDate,
  toDate,
  product_id,
  category_id,
  region,
}: {
  fromDate: Date;
  toDate: Date;
  product_id: string;
  category_id: number;
  region: string;
}) {
  try {
    // Query for getting total revenue from orders based on filters

    let productFilter = "";
    let categoryFilter = "";
    let regionFilter = "";

    if (product_id) {
      productFilter = `AND o.product_id = '${product_id}'`;
    }
    if (region) {
      regionFilter = `AND LOWER(o.region) LIKE '${region.toLowerCase()}'`;
    }
    if (category_id) {
      categoryFilter = `AND p.category_id = ${category_id}`;
    }

    let [revenueResponse]: any = await sequelize.query(`SELECT
  SUM(o.total_price) as total_revenue
FROM
  orders as o
  LEFT JOIN products as p ON o.product_id = p.id
WHERE
  o.created_at::date BETWEEN '${fromDate}' AND '${toDate}'
${productFilter}
${categoryFilter}
${regionFilter};`);

    return {
      code: 200,
      message: success.getRevenue,
      codeMessage: codeSuccess.ok,
      responseData: revenueResponse[0],
    };
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}

export default { GetRevenue };
