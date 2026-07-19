const express = require('express');
const { body } = require('express-validator');
const { validate } = require('../middleware/validate');
const { requireAuth } = require('../middleware/auth');
const { requireRole } = require('../middleware/roles');
const { list, create, update, remove } = require('../controllers/category.controller');

const router = express.Router();

const rules = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('registration_fee').isFloat({ min: 0 }).withMessage('Registration fee must be a number'),
  body('monthly_fee').isFloat({ min: 0 }).withMessage('Monthly fee must be a number'),
];

// anyone can see the categories (needed on the register/payment pages)
router.get('/', list);

// only admins manage them
router.post('/', requireAuth, requireRole('admin'), rules, validate, create);
router.put('/:id', requireAuth, requireRole('admin'), rules, validate, update);
router.delete('/:id', requireAuth, requireRole('admin'), remove);

module.exports = router;
