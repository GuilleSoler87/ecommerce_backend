'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsToMany(models.Order, {
        through: models.OrderProduct
      });
      Product.belongsToMany(models.Category, {
        through: models.Classification
      });
      Product.hasMany(models.Review);
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
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
