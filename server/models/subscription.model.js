const { query } = require('../db/pool');

// return dates as plain YYYY-MM-DD strings so comparisons/JSON stay simple
const DATE_COLS = `
  to_char(s.start_date,'YYYY-MM-DD') AS start_date,
  to_char(s.expiry_date,'YYYY-MM-DD') AS expiry_date`;

async function getLatestByUser(userId) {
  const res = await query(
    `SELECT s.id, s.user_id, s.category_id, ${DATE_COLS}, s.status,
            c.name AS category_name
     FROM subscriptions s
     JOIN membership_categories c ON c.id = s.category_id
     WHERE s.user_id = $1
     ORDER BY s.id DESC
     LIMIT 1`,
    [userId]
  );
  return res.rows[0];
}

async function createSubscription({ user_id, category_id, start_date, expiry_date }) {
  const res = await query(
    `INSERT INTO subscriptions (user_id, category_id, start_date, expiry_date, status)
     VALUES ($1, $2, $3, $4, 'active')
     RETURNING id, user_id, category_id,
       to_char(start_date,'YYYY-MM-DD') AS start_date,
       to_char(expiry_date,'YYYY-MM-DD') AS expiry_date, status`,
    [user_id, category_id, start_date, expiry_date]
  );
  return res.rows[0];
}

async function extendSubscription(id, expiry_date, category_id) {
  const res = await query(
    `UPDATE subscriptions
     SET expiry_date = $1, category_id = $2, status = 'active'
     WHERE id = $3
     RETURNING id, user_id, category_id,
       to_char(start_date,'YYYY-MM-DD') AS start_date,
       to_char(expiry_date,'YYYY-MM-DD') AS expiry_date, status`,
    [expiry_date, category_id, id]
  );
  return res.rows[0];
}

module.exports = { getLatestByUser, createSubscription, extendSubscription };
