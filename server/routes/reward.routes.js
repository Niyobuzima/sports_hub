const express = require('express');
const { requireAuth } = require('../middleware/auth');
const { myRewards } = require('../controllers/reward.controller');

const router = express.Router();

router.get('/me', requireAuth, myRewards);

module.exports = router;
