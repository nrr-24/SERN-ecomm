const express = require("express");
const router = express.Router();
const categoriesController = require("../controllers/categoriesController");

// Get all categories
router.get("/", categoriesController.getAllCategories);

// Create a new category
router.post("/create-category", categoriesController.createCategory);

module.exports = router;