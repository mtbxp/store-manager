const express = require('express');
const productController = require('../controllers/product.controller');
const { productValidation } = require('../middlewares/productValidation');

const router = express.Router();

router.get('/search', productController.getProductByQuery);

router.get('/', productController.getProduct);

router.get('/:id', productController.getProductById);

router.post('/', productValidation, productController.newProduct);

router.put('/:id', productValidation, productController.updateProduct);

router.delete('/:id', productController.deleteProduct);

module.exports = router;
