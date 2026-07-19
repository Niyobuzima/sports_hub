const express = require('express');
const { requireAuth } = require('../middleware/auth');
const { requireActive } = require('../middleware/active');
const { list, book, myBookings } = require('../controllers/facility.controller');

const router = express.Router();

router.use(requireAuth, requireActive);

router.get('/', list);
router.post('/book', book);
router.get('/bookings', myBookings);

module.exports = router;
