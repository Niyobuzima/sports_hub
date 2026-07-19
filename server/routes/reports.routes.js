const express = require('express');
const { requireAuth } = require('../middleware/auth');
const { requireRole } = require('../middleware/roles');
const { summary, transactions } = require('../controllers/reports.controller');

const router = express.Router();

router.use(requireAuth, requireRole('admin'));

router.get('/summary', summary);
router.get('/transactions', transactions);

module.exports = router;
