const { query } = require('../db/pool');

async function findByEmail(email) {
  const res = await query('SELECT * FROM users WHERE email = $1', [email]);
  return res.rows[0];
}

async function findById(id) {
  const res = await query(
    `SELECT u.id, u.full_name, u.email, u.account_status, u.reward_points,
            u.referral_code, r.name AS role
     FROM users u JOIN roles r ON r.id = u.role_id
     WHERE u.id = $1`,
    [id]
  );
  return res.rows[0];
}

async function createUser({ full_name, email, password_hash, role_id }) {
  const res = await query(
    `INSERT INTO users (full_name, email, password_hash, role_id)
     VALUES ($1, $2, $3, $4)
     RETURNING id, full_name, email, account_status, role_id`,
    [full_name, email, password_hash, role_id]
  );
  return res.rows[0];
}

async function getRoleByName(name) {
  const res = await query('SELECT id, name FROM roles WHERE name = $1', [name]);
  return res.rows[0];
}

module.exports = { findByEmail, findById, createUser, getRoleByName };
