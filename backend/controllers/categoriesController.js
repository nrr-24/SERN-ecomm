const Category = require("../models/Category");


exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      attributes: ["categoryId", "name", "description"],
    });
    res.json({ categories });
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error: error.message });
  }
};


exports.getAllCategoriesForAdmin = async (req, res) => {
  try {
      const categories = await Category.findAll();
      res.status(200).json({ message: "Categories fetched successfully for admin", categories });
  } catch (error) {
      res.status(500).json({ message: "Error fetching categories for admin", error });
  }
};

// Create category (Admin only)
exports.createCategory = async (req, res) => {
  const { name, description } = req.body;
  try {
    const category = await Category.create({ name, description });
    res.status(201).json({ message: "Category created successfully", category });
  } catch (error) {
    res.status(500).json({ message: "Error creating category", error: error.message });
  }
};


// Update category (Admin only)
exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    category.name = name || category.name;
    category.description = description || category.description;
    await category.save();
    res.status(200).json({ message: "Category updated successfully", category });
  } catch (error) {
    res.status(500).json({ message: "Error updating category", error: error.message });
  }
};


// Delete category (Admin only)
exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    await category.destroy();
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting category", error });
  }
};
