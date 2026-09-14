const express = require('express');
const { createOrder, verifyPayment, getRazorpayKey } = require('../controllers/paymentController');

const router = express.Router();

router.post('/order', createOrder);
router.post('/verify', verifyPayment);
router.get('/key', getRazorpayKey);

module.exports = router;
