const Products = require("../models/Product");

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Products.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get products by category
exports.getProductsByCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const products = await Products.findAll({ where: { Category_ID: id } });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a product
exports.createProduct = async (req, res) => {
  try {
    // Only create the product in the Products table
    const product = await Products.create(req.body);
    res.json(product); // Send the created product as the response
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, Category_ID } = req.body;

  try {
    const product = await Products.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update the product's fields
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.Category_ID = Category_ID || product.Category_ID;

    await product.save(); // Save changes
    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Products.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.destroy(); // Delete the product
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all products for admin
exports.getAllProductsForAdmin = async (req, res) => {
  try {
    const products = await Products.findAll();
    res.status(200).json({ message: "Products fetched successfully", products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
