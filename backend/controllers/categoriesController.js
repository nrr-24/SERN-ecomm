const Category = require("../models/Category");
const CategorizedProduct = require("../models/CategorizedProduct");

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    if (req.body.productIds && req.body.productIds.length > 0) {
      const categorizedProducts = req.body.productIds.map(productId => ({
        productId,
        categoryId: category.categoryId
      }));
      await CategorizedProduct.bulkCreate(categorizedProducts);
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};