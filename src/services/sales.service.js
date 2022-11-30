const camelize = require('camelize');
const salesModel = require('../models/sales.model');

const getAllSales = async () => {
  const allSales = await salesModel.getAllSales();
  return camelize(allSales);
};

const getSaleById = async (id) => {
  const result = await salesModel.getSaleById(id);
  if (!result) return null;
  return camelize(result);
};

module.exports = {
  getAllSales,
  getSaleById,
};