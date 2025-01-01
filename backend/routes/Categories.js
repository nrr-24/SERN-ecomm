const express = require("express");
const router = express.Router();
const categoriesController = require("../controllers/categoriesController");
const { authenticate, isAdmin } = require('../middleware/authMiddleware');

//admin routes
router.get("/admin", categoriesController.getAllCategoriesForAdmin);
router.post("/admin/create", categoriesController.createCategory);
router.put("/admin/update/:id", categoriesController.updateCategory);    
router.delete("/admin/delete/:id", categoriesController.deleteCategory); 


// user routes
router.get("/", categoriesController.getAllCategories);


module.exports = router;