const express = require('express');
const salesController = require('../controllers/sales.controller');
const salesValidation = require('../middlewares/salesValidation');
const saleIdExists = require('../middlewares/saleIdExists');

const salesRouter = express.Router();

salesRouter.get('/', salesController.getAllSales);
salesRouter.get('/:id', salesController.getSaleById);
salesRouter.post('/', salesValidation.validateSales, salesController.addNewSale);
salesRouter.put('/:id', salesValidation.validateSales, salesController.salesUpdate);
salesRouter.delete('/:id', saleIdExists.saleIdExists, salesController.deleteSale);

module.exports = salesRouter;
