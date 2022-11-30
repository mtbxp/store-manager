const productService = require('../services/product.service');

const getProduct = async (_req, res) => {
  const result = await productService.getAllProducts();
  return res.status(200).json(result);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
    const result = await productService.getProductById(id);
  if (!result) {
    return res.status(404).json({ message: 'Product not found' });
  }
    return res.status(200).json(result);
};

const newProduct = async (req, res) => {
  const { name } = req.body;
  const result = await productService.newProduct(name);
  return res.status(201).json(result);
};

module.exports = {
  getProduct,
  getProductById,
  newProduct,
};
