const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");

// Get products by category
router.get("/category/:id/products", productsController.getProductsByCategory);

// Create a new product
router.post("/create-product", productsController.createProduct);

module.exports = router;