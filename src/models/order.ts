import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { customer, customerId } from './customer';
import type { payment_method, payment_methodId } from './payment_method';
import type { product, productId } from './product';

export interface orderAttributes {
  id: string;
  product_id?: string;
  customer_id?: string;
  region?: string;
  date_of_sale?: string;
  quantity: number;
  unit_price?: number;
  total_price?: number;
  discount_amount?: number;
  shipping_cost?: number;
  payment_type: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export type orderPk = "id";
export type orderId = order[orderPk];
export type orderOptionalAttributes = "product_id" | "customer_id" | "region" | "date_of_sale" | "unit_price" | "total_price" | "discount_amount" | "shipping_cost" | "is_active" | "created_at" | "updated_at";
export type orderCreationAttributes = Optional<orderAttributes, orderOptionalAttributes>;

export class order extends Model<orderAttributes, orderCreationAttributes> implements orderAttributes {
  id!: string;
  product_id?: string;
  customer_id?: string;
  region?: string;
  date_of_sale?: string;
  quantity!: number;
  unit_price?: number;
  total_price?: number;
  discount_amount?: number;
  shipping_cost?: number;
  payment_type!: number;
  is_active!: boolean;
  created_at!: Date;
  updated_at!: Date;

  // order belongsTo customer via customer_id
  customer!: customer;
  getCustomer!: Sequelize.BelongsToGetAssociationMixin<customer>;
  setCustomer!: Sequelize.BelongsToSetAssociationMixin<customer, customerId>;
  createCustomer!: Sequelize.BelongsToCreateAssociationMixin<customer>;
  // order belongsTo payment_method via payment_type
  payment_type_payment_method!: payment_method;
  getPayment_type_payment_method!: Sequelize.BelongsToGetAssociationMixin<payment_method>;
  setPayment_type_payment_method!: Sequelize.BelongsToSetAssociationMixin<payment_method, payment_methodId>;
  createPayment_type_payment_method!: Sequelize.BelongsToCreateAssociationMixin<payment_method>;
  // order belongsTo product via product_id
  product!: product;
  getProduct!: Sequelize.BelongsToGetAssociationMixin<product>;
  setProduct!: Sequelize.BelongsToSetAssociationMixin<product, productId>;
  createProduct!: Sequelize.BelongsToCreateAssociationMixin<product>;

  static initModel(sequelize: Sequelize.Sequelize): typeof order {
    return order.init({
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    product_id: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'products',
        key: 'id'
      }
    },
    customer_id: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'customers',
        key: 'id'
      }
    },
    region: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    date_of_sale: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    unit_price: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    total_price: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    discount_amount: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    shipping_cost: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    payment_type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'payment_methods',
        key: 'id'
      }
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'orders',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "orders_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
