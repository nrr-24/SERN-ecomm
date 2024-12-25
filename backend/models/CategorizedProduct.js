const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const CategorizedProduct = sequelize.define('CategorizedProduct', {
  productId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'products',
      key: 'productId'
    }
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'categories',
      key: 'categoryId'
    }
  }
});

module.exports = CategorizedProduct;