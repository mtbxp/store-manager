const productModel = require('../models/product.model');

const getAllProducts = async () => {
  const product = await productModel.getAllProducts();
  return product;
};

const getProductById = async (id) => {
  const result = await productModel.getProductById(id);

  if (!result) return null;
  return result;
};

const newProduct = async (name) => {
  const product = await productModel.newProduct(name);
  return product;
};

module.exports = {
  getAllProducts,
  getProductById,
  newProduct,
};
