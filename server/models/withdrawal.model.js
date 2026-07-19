const { query } = require('../db/pool');

async function createWithdrawal(userId, points) {
  const res = await query(
    `INSERT INTO point_withdrawals (user_id, points) VALUES ($1,$2) RETURNING *`,
    [userId, points]
  );
  return res.rows[0];
}

async function listByUser(userId) {
  const res = await query(
    'SELECT * FROM point_withdrawals WHERE user_id = $1 ORDER BY created_at DESC',
    [userId]
  );
  return res.rows;
}

module.exports = { createWithdrawal, listByUser };
