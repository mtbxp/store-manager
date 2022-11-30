const express = require('express');
const productController = require('../controllers/product.controller');
const { productValidation } = require('../middlewares/productValidation');

const router = express.Router();

router.get('/', productController.getProduct);

router.get('/:id', productController.getProductById);

router.post('/', productValidation, productController.newProduct);

module.exports = router;
