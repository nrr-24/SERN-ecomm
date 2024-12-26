const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const OrderItem = sequelize.define("OrderItem", {
    OrderItemID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },

});

module.exports = OrderItem;