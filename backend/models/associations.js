const Products = require('./Product');
const Category = require('./Category');
const CategorizedProduct = require('./CategorizedProduct');

Category.hasMany(CategorizedProduct, { foreignKey: 'categoryId' });
CategorizedProduct.belongsTo(Category, { foreignKey: 'categoryId' });

Products.hasOne(CategorizedProduct, { foreignKey: 'productId' });
CategorizedProduct.belongsTo(Products, { foreignKey: 'productId' });