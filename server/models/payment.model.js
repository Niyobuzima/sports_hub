const { query } = require('../db/pool');

async function createPayment(p) {
  const res = await query(
    `INSERT INTO payments (user_id, subscription_id, payment_type, months_paid, amount)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [p.user_id, p.subscription_id || null, p.payment_type, p.months_paid, p.amount]
  );
  return res.rows[0];
}

async function listByUser(userId) {
  const res = await query(
    'SELECT * FROM payments WHERE user_id = $1 ORDER BY paid_at DESC',
    [userId]
  );
  return res.rows;
}

module.exports = { createPayment, listByUser };
