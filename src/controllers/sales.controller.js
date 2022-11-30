const salesService = require('../services/sales.service');

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

module.exports = {
  getAllSales,
  getSaleById,
};