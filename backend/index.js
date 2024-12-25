const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const db = require("./config/database");
const Products = require("./models/Product");
const Category = require("./models/Category");
const CategorizedProduct = require("./models/CategorizedProduct");

// Import associations
require("./models/associations");

// Import routes
const authRoutes = require("./routes/Auth");
const categoriesRoute = require("./routes/Categories");
const productsRoute = require("./routes/Products");

// Initialize dotenv for environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/auth", authRoutes); // Auth routes
app.use("/categories", categoriesRoute); // Category routes
app.use("/products", productsRoute); // Product routes

// Test root endpoint
app.get("/", (req, res) => {
  res.send("Welcome to the E-Commerce API");
});

// Ensure models are initialized and start the server
db.sequelize.sync({ force: false }) // Set force to true if you want to drop and recreate tables on every sync
  .then(() => {
    console.log("Database connected and tables synced!");
    app.listen(PORT, () => {
      console.log(`Server running at http://127.0.0.1:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database or create tables, shutting down...", error);
    process.exit(1);
  });
