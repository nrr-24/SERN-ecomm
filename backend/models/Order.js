const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Order = sequelize.define("Order", {
    OrderID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    OrderDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    TotalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    OrderStatus: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Order;