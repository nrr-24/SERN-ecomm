const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./config/database");
const Products = require("./models/Product");
const Category = require("./models/Category");
const CategorizedProduct = require("./models/CategorizedProduct");

// Import associations
require('./models/associations');

app.use(cors());
app.use(express.json());

const categoriesRoute = require("./routes/Categories");
const productsRoute = require("./routes/Products");

app.use("/categories", categoriesRoute);
app.use("/products", productsRoute);

// Ensure models are initialized
db.sequelize.sync({ force: false }) // Set force to true if you want to drop and recreate tables on every sync
  .then(() => {
    console.log('Database & tables created!');
    app.listen(3001, () => {
      console.log('Server running on port 3001');
    });
  })
  .catch(error => {
    console.error('Unable to create tables, shutting down...', error);
    process.exit(1);
  });