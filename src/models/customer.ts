import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { order, orderId } from './order';

export interface customerAttributes {
  id: string;
  customer_name: string;
  customer_email_id?: string;
  customer_mobile_no?: string;
  customer_address?: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export type customerPk = "id";
export type customerId = customer[customerPk];
export type customerOptionalAttributes = "customer_email_id" | "customer_mobile_no" | "customer_address" | "is_active" | "created_at" | "updated_at";
export type customerCreationAttributes = Optional<customerAttributes, customerOptionalAttributes>;

export class customer extends Model<customerAttributes, customerCreationAttributes> implements customerAttributes {
  id!: string;
  customer_name!: string;
  customer_email_id?: string;
  customer_mobile_no?: string;
  customer_address?: string;
  is_active!: boolean;
  created_at!: Date;
  updated_at!: Date;

  // customer hasMany order via customer_id
  orders!: order[];
  getOrders!: Sequelize.HasManyGetAssociationsMixin<order>;
  setOrders!: Sequelize.HasManySetAssociationsMixin<order, orderId>;
  addOrder!: Sequelize.HasManyAddAssociationMixin<order, orderId>;
  addOrders!: Sequelize.HasManyAddAssociationsMixin<order, orderId>;
  createOrder!: Sequelize.HasManyCreateAssociationMixin<order>;
  removeOrder!: Sequelize.HasManyRemoveAssociationMixin<order, orderId>;
  removeOrders!: Sequelize.HasManyRemoveAssociationsMixin<order, orderId>;
  hasOrder!: Sequelize.HasManyHasAssociationMixin<order, orderId>;
  hasOrders!: Sequelize.HasManyHasAssociationsMixin<order, orderId>;
  countOrders!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof customer {
    return customer.init({
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    customer_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    customer_email_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    customer_mobile_no: {
      type: DataTypes.STRING,
      allowNull: true
    },
    customer_address: {
      type: DataTypes.STRING,
      allowNull: true
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
    tableName: 'customers',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "customers_customer_email_id_key",
        unique: true,
        fields: [
          { name: "customer_email_id" },
        ]
      },
      {
        name: "customers_customer_mobile_no_key",
        unique: true,
        fields: [
          { name: "customer_mobile_no" },
        ]
      },
      {
        name: "customers_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
