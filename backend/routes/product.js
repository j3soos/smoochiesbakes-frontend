const {createProduct, getCategoryProducts} = require('../controller/product');
const router = require('express').Router();

router.post('/createProduct', createProduct)
router.get('/getCategoryProducts', getCategoryProducts)

module.exports = router;