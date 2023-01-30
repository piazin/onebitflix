import { sequelize } from '../database';
import { DataTypes, Model, Optional } from 'sequelize';

export interface Category {
  id: number;
  name: string;
  position: number;
  created_at: Date;
  updated_at: Date;
}

export interface CategoryCreationAttributes extends Optional<Category, 'id'> {}

export interface CategoryInstance
  extends Model<Category, CategoryCreationAttributes>,
    Category {}

export const Category = sequelize.define<CategoryInstance, Category>(
  'Category',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    position: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    created_at: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updated_at: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  }
);
