const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("grocerystore", "root", null, {
  host: "127.0.0.1",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Unable to connect to the database:", err));

module.exports = { sequelize };
