import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { product, productId } from './product';

export interface product_categoryAttributes {
  id: number;
  category: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export type product_categoryPk = "id";
export type product_categoryId = product_category[product_categoryPk];
export type product_categoryOptionalAttributes = "id" | "is_active" | "created_at" | "updated_at";
export type product_categoryCreationAttributes = Optional<product_categoryAttributes, product_categoryOptionalAttributes>;

export class product_category extends Model<product_categoryAttributes, product_categoryCreationAttributes> implements product_categoryAttributes {
  id!: number;
  category!: string;
  is_active!: boolean;
  created_at!: Date;
  updated_at!: Date;

  // product_category hasMany product via category_id
  products!: product[];
  getProducts!: Sequelize.HasManyGetAssociationsMixin<product>;
  setProducts!: Sequelize.HasManySetAssociationsMixin<product, productId>;
  addProduct!: Sequelize.HasManyAddAssociationMixin<product, productId>;
  addProducts!: Sequelize.HasManyAddAssociationsMixin<product, productId>;
  createProduct!: Sequelize.HasManyCreateAssociationMixin<product>;
  removeProduct!: Sequelize.HasManyRemoveAssociationMixin<product, productId>;
  removeProducts!: Sequelize.HasManyRemoveAssociationsMixin<product, productId>;
  hasProduct!: Sequelize.HasManyHasAssociationMixin<product, productId>;
  hasProducts!: Sequelize.HasManyHasAssociationsMixin<product, productId>;
  countProducts!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof product_category {
    return product_category.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    category: {
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
    tableName: 'product_categories',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "product_categories_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
