const salesService = require('../services/sales.service');

const saleNotFound = 'Sale not found';
const productNotFound = 'Product not found';

const getAllSales = async (_req, res) => {
  const result = await salesService.getAllSales();
  return res.status(200).json(result);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const result = await salesService.getSaleById(id);

  if (result.length === 0) {
    return res.status(404).json({ message: 'Sale not found' });
  }

  return res.status(200).json(result);
};

const addNewSale = async (req, res) => {
  const sale = req.body;
    const response = await salesService.addNewSale(sale);
    if (response.alert) { return res.status(404).json({ message: 'Product not found' }); }
    return res.status(201).json(response);
};

const salesUpdate = async (req, res) => {
  const { id } = req.params;
  const sales = req.body;
    const results = await salesService.salesUpdate({ id, sales });
    if (results.message) return res.status(404).json({ message: saleNotFound });
    if (results.alert) { return res.status(404).json({ message: productNotFound }); }
    return res.status(200).json(results);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const result = await salesService.deleteSale(id);
  if (!result) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  return res.status(204).json();
};

module.exports = {
  getAllSales,
  getSaleById,
  deleteSale,
  addNewSale,
  salesUpdate,
};