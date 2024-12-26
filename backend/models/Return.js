const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Return = sequelize.define("Return", {
    ReturnID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ReturnDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    Reason: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    Status: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Return;