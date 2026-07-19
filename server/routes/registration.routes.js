const express = require('express');
const { requireAuth } = require('../middleware/auth');
const { requireRole } = require('../middleware/roles');
const { list, updateStatus } = require('../controllers/registration.controller');

const router = express.Router();

router.use(requireAuth, requireRole('admin'));

router.get('/', list);
router.patch('/:userId/status', updateStatus);

module.exports = router;
