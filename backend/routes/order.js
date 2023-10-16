const {makeOrder} = require('../controller/order');
const router = require('express').Router();

router.post('/makeOrder', makeOrder)

module.exports = router;