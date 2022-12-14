const validateSales = (req, res, next) => {
  const sales = req.body;
  const productsId = sales.filter((sale) => sale.productId);
  const quantity = sales.filter((sale) => sale.quantity !== undefined);
  const QttOfSale = sales.filter((sale) => sale.quantity < 1);
  if (productsId.length !== sales.length) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  if (quantity.length !== sales.length) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  if (QttOfSale.length > 0) {
    return res
      .status(422)
      .json({ message: '"quantity" must be greater than or equal to 1' });
  }
  return next();
};

module.exports = {
  validateSales,
};
