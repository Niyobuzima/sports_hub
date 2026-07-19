const express = require('express');
const { query } = require('../db/pool');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const result = await query('SELECT NOW() as time');
    res.json({ status: 'ok', dbTime: result.rows[0].time });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
