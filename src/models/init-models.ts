import type { Sequelize } from "sequelize";
import { customer as _customer } from "./customer";
import type { customerAttributes, customerCreationAttributes } from "./customer";
import { order as _order } from "./order";
import type { orderAttributes, orderCreationAttributes } from "./order";
import { payment_method as _payment_method } from "./payment_method";
import type { payment_methodAttributes, payment_methodCreationAttributes } from "./payment_method";
import { product_category as _product_category } from "./product_category";
import type { product_categoryAttributes, product_categoryCreationAttributes } from "./product_category";
import { product as _product } from "./product";
import type { productAttributes, productCreationAttributes } from "./product";

export {
  _customer as customer,
  _order as order,
  _payment_method as payment_method,
  _product_category as product_category,
  _product as product,
};

export type {
  customerAttributes,
  customerCreationAttributes,
  orderAttributes,
  orderCreationAttributes,
  payment_methodAttributes,
  payment_methodCreationAttributes,
  product_categoryAttributes,
  product_categoryCreationAttributes,
  productAttributes,
  productCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const customer = _customer.initModel(sequelize);
  const order = _order.initModel(sequelize);
  const payment_method = _payment_method.initModel(sequelize);
  const product_category = _product_category.initModel(sequelize);
  const product = _product.initModel(sequelize);

  order.belongsTo(customer, { as: "customer", foreignKey: "customer_id"});
  customer.hasMany(order, { as: "orders", foreignKey: "customer_id"});
  order.belongsTo(payment_method, { as: "payment_type_payment_method", foreignKey: "payment_type"});
  payment_method.hasMany(order, { as: "orders", foreignKey: "payment_type"});
  product.belongsTo(product_category, { as: "category", foreignKey: "category_id"});
  product_category.hasMany(product, { as: "products", foreignKey: "category_id"});
  order.belongsTo(product, { as: "product", foreignKey: "product_id"});
  product.hasMany(order, { as: "orders", foreignKey: "product_id"});

  return {
    customer: customer,
    order: order,
    payment_method: payment_method,
    product_category: product_category,
    product: product,
  };
}
