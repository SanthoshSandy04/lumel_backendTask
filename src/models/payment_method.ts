import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { order, orderId } from './order';

export interface payment_methodAttributes {
  id: number;
  method: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export type payment_methodPk = "id";
export type payment_methodId = payment_method[payment_methodPk];
export type payment_methodOptionalAttributes = "id" | "is_active" | "created_at" | "updated_at";
export type payment_methodCreationAttributes = Optional<payment_methodAttributes, payment_methodOptionalAttributes>;

export class payment_method extends Model<payment_methodAttributes, payment_methodCreationAttributes> implements payment_methodAttributes {
  id!: number;
  method!: string;
  is_active!: boolean;
  created_at!: Date;
  updated_at!: Date;

  // payment_method hasMany order via payment_type
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

  static initModel(sequelize: Sequelize.Sequelize): typeof payment_method {
    return payment_method.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    method: {
      type: DataTypes.STRING,
      allowNull: false
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
    tableName: 'payment_methods',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "payment_methods_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
