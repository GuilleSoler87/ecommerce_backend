'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsToMany(models.Order, {
        through: models.OrderProduct
      });
      Product.belongsToMany(models.Category, {
        through: models.Classification
      });
    }
  }
  Product.init({
    name: {
     type: DataTypes.STRING,
     allowNull: false,
      validate: {
        notNull: {
          msg: "Por favor introduce nombre del producto",
        },
      },
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Por favor introduce precio del producto",
        },
      },
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};