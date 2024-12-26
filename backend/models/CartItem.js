const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const CartItem = sequelize.define("CartItem", {
    CartItemID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = CartItem;