const express = require('express');
const salesController = require('../controllers/sales.controller');
const { saleIdExists } = require('../middlewares/salesValidation');

const salesRouter = express.Router();

salesRouter.get('/', salesController.getAllSales);
salesRouter.get('/:id', salesController.getSaleById);
salesRouter.delete('/:id', saleIdExists, salesController.deleteSale);

module.exports = salesRouter;
