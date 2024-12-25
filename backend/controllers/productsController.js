const Products = require("../models/Product");
const CategorizedProduct = require("../models/CategorizedProduct");

exports.getProductsByCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const products = await Products.findAll({ where: { categoryId: id } });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const product = await Products.create(req.body);
    await CategorizedProduct.create({
      productId: product.productId,
      categoryId: req.body.categoryId
    });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};