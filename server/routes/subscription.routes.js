const express = require('express');
const { requireAuth } = require('../middleware/auth');
const { mySubscription } = require('../controllers/subscription.controller');

const router = express.Router();

router.get('/me', requireAuth, mySubscription);

module.exports = router;
