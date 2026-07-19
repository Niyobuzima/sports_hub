const express = require('express');
const { requireAuth } = require('../middleware/auth');
const { requireActive } = require('../middleware/active');
const { withdraw, myWithdrawals } = require('../controllers/withdrawal.controller');

const router = express.Router();

router.use(requireAuth, requireActive);

router.post('/', withdraw);
router.get('/me', myWithdrawals);

module.exports = router;
