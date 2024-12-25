const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Products = sequelize.define('Products', {
    productId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING
    },
    price: {
        allowNull: false,
        type: DataTypes.FLOAT
    },
    stock: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    categoryId: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    image: {
        allowNull: false,
        type: DataTypes.STRING
    },
});

module.exports = Products;