const express = require('express');
const { body } = require('express-validator');
const { validate } = require('../middleware/validate');
const { requireAuth } = require('../middleware/auth');
const { requireActive } = require('../middleware/active');
const { createPayment, myPayments } = require('../controllers/payment.controller');

const router = express.Router();

router.use(requireAuth, requireActive);

router.post(
  '/',
  [
    body('category_id').isInt().withMessage('Category is required'),
    body('payment_type').isIn(['registration', 'monthly']).withMessage('Invalid payment type'),
  ],
  validate,
  createPayment
);

router.get('/me', myPayments);

module.exports = router;
