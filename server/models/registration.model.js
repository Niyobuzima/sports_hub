const { query } = require('../db/pool');

async function createRegistration({ user_id, category_id }) {
  const res = await query(
    `INSERT INTO registrations (user_id, category_id)
     VALUES ($1, $2)
     RETURNING id, status`,
    [user_id, category_id || null]
  );
  return res.rows[0];
}

module.exports = { createRegistration };
