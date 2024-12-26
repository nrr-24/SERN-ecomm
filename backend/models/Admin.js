const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Admin = sequelize.define("Admin", {
    AdminID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    Password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Admin;