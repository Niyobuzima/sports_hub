const express = require('express');
const { requireAuth } = require('../middleware/auth');
const { myNotifications, markRead } = require('../controllers/notification.controller');

const router = express.Router();

router.get('/me', requireAuth, myNotifications);
router.post('/read', requireAuth, markRead);

module.exports = router;
