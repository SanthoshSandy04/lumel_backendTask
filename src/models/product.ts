import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { order, orderId } from './order';
import type { product_category, product_categoryId } from './product_category';

export interface productAttributes {
  id: string;
  product_name: string;
  product_description?: string;
  category_id: number;
  unit_price?: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export type productPk = "id";
export type productId = product[productPk];
export type productOptionalAttributes = "product_description" | "unit_price" | "is_active" | "created_at" | "updated_at";
export type productCreationAttributes = Optional<productAttributes, productOptionalAttributes>;

export class product extends Model<productAttributes, productCreationAttributes> implements productAttributes {
  id!: string;
  product_name!: string;
  product_description?: string;
  category_id!: number;
  unit_price?: number;
  is_active!: boolean;
  created_at!: Date;
  updated_at!: Date;

  // product belongsTo product_category via category_id
  category!: product_category;
  getCategory!: Sequelize.BelongsToGetAssociationMixin<product_category>;
  setCategory!: Sequelize.BelongsToSetAssociationMixin<product_category, product_categoryId>;
  createCategory!: Sequelize.BelongsToCreateAssociationMixin<product_category>;
  // product hasMany order via product_id
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

  static initModel(sequelize: Sequelize.Sequelize): typeof product {
    return product.init({
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    product_description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'product_categories',
        key: 'id'
      }
    },
    unit_price: {
      type: DataTypes.DOUBLE,
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
    tableName: 'products',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "products_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
