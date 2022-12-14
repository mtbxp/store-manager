const saleService = require('../services/sales.service');

const saleIdExists = async (req, res, next) => {
  const { id } = req.params;

  const sale = await saleService.getSaleById(id);

  if (sale.length === 0) { return res.status(404).json({ message: 'Sale not found' }); }

  req.sales = sale;
  return next();
};

module.exports = {
  saleIdExists,
};
