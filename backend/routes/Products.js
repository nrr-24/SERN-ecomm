const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");

router.get('/category/:id', productsController.getProductsByCategory); // Matches /products/category/:id
router.post("/create-product", productsController.createProduct);      // Matches /products/create-product

module.exports = router;
