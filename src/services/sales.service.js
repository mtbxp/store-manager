const camelize = require('camelize');
const salesModel = require('../models/sales.model');
const productsModels = require('../models/product.model');

const getAllSales = async () => {
  const allSales = await salesModel.getAllSales();
  return camelize(allSales);
};

const getSaleById = async (id) => {
  const result = await salesModel.getSaleById(id);
  if (!result) return null;
  return camelize(result);
};

const addNewSale = async (sales) => {
  const listProducts = await productsModels.getAllProducts();
  const checkSale = sales.every((sale) =>
    listProducts.some((product) => product.id === sale.productId));
  const notFound = { alert: 'Product does not exist' };
  if (!checkSale) return notFound;
  const newSale = await salesModel.addNewSale(sales);
  const sold = {
    id: newSale.id,
    itemsSold: [...sales],
  };
  return sold;
};

const salesUpdate = async ({ id, sales }) => {
  const getByID = await salesModel.getSaleById(id);
  const saleNotFound = { message: 'Sale not found' };
  if (getByID.length === 0) return saleNotFound;

  const getProducts = await productsModels.getAllProducts();
  const checkProducts = sales.every((sale) =>
    getProducts.some((product) => product.id === sale.productId));
  const productNotFound = { alert: 'Product does not exist' };
  if (!checkProducts) return productNotFound;

  await salesModel.salesUpdate({ id, sales });
  const result = {
    saleId: id,
    itemsUpdated: sales,
  };
  return result;
};

const deleteSale = async (id) => salesModel.deleteSale(id);

module.exports = {
  getAllSales,
  getSaleById,
  deleteSale,
  addNewSale,
  salesUpdate,
};