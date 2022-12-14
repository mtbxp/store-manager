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

const updateProduct = async (id, name) => {
  const result = await productModel.updateProduct(id, name);
  return result;
};

const deleteProduct = async (id) => {
  const result = await productModel.deleteProduct(id);
  return result;
};

const getProductByQuery = async (query) => {
  if (query.length === 0) {
    return productModel.getAllProducts();
  }
  return productModel.getProductByQuery(query);
};

module.exports = {
  getAllProducts,
  getProductById,
  newProduct,
  updateProduct,
  deleteProduct,
  getProductByQuery,
};
