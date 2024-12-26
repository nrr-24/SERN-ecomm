const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Userorder = sequelize.define("Userorder", {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
});

module.exports = Userorder;