const express = require('express');
const { requireAuth } = require('../middleware/auth');
const { myReferrals } = require('../controllers/referral.controller');

const router = express.Router();

router.get('/me', requireAuth, myReferrals);

module.exports = router;
