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

async function listRegistrations() {
  const res = await query(
    `SELECT r.id, r.status, r.created_at, r.reviewed_at,
            u.id AS user_id, u.full_name, u.email, u.account_status,
            rl.name AS role, c.name AS category
     FROM registrations r
     JOIN users u ON u.id = r.user_id
     JOIN roles rl ON rl.id = u.role_id
     LEFT JOIN membership_categories c ON c.id = r.category_id
     ORDER BY r.created_at DESC`
  );
  return res.rows;
}

// flip the user account status and record who reviewed it
async function reviewRegistration({ userId, accountStatus, regStatus, adminId }) {
  await query('UPDATE users SET account_status = $1 WHERE id = $2', [
    accountStatus,
    userId,
  ]);
  const res = await query(
    `UPDATE registrations
     SET status = $1, reviewed_by = $2, reviewed_at = now()
     WHERE user_id = $3
     RETURNING id, status`,
    [regStatus, adminId, userId]
  );
  return res.rows[0];
}

module.exports = { createRegistration, listRegistrations, reviewRegistration };
