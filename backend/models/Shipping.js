const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Shipping = sequelize.define("Shipping", {
    ShippingID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ShippingDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    TrackingNumber: {
        type: DataTypes.STRING
    },
    Status: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Shipping;