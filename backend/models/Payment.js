const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Payment = sequelize.define("Payment", {
    PaymentID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    PaymentDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    PaymentMethod: {
        type: DataTypes.STRING,
        allowNull: false
    },
    PaymentStatus: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Payment;