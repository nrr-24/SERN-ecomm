const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");

router.get('/category/:id', productsController.getProductsByCategory);

//admin
router.post("/admin/create-product", productsController.createProduct);      // Matches /products/create-product
router.put("/admin/update-product/:id", productsController.updateProduct);    // Matches /products/update-product/:id 
router.delete("/admin/delete-product/:id", productsController.deleteProduct); // Matches /products/delete-product/:id  
router.get("/admin", productsController.getAllProductsForAdmin);                          // Matches /products


router.get("/", productsController.getAllProducts);                          // Matches /products

module.exports = router;
