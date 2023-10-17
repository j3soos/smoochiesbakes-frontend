const {makeOrder, confirmOrderPayment} = require('../controller/order');
const router = require('express').Router();

router.post('/makeOrder', makeOrder)
router.post('/confirmOrderPayment/:order_id', confirmOrderPayment)

module.exports = router;