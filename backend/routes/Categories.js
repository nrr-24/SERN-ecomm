const express = require("express");
const router = express.Router();
const categoriesController = require("../controllers/categoriesController");
const { authenticate, isAdmin } = require('../middleware/authMiddleware');

//admin routes
router.get("/admin", authenticate, isAdmin, categoriesController.getAllCategoriesForAdmin);
router.post("/admin/create", authenticate, isAdmin, categoriesController.createCategory);
router.put("/admin/update/:id", authenticate, isAdmin, categoriesController.updateCategory);    
router.delete("/admin/delete/:id", authenticate, isAdmin, categoriesController.deleteCategory); 


// user routes
router.get("/", categoriesController.getAllCategories);


module.exports = router;