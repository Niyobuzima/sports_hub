const { query } = require('../db/pool');

async function listCategories() {
  const res = await query(
    'SELECT * FROM membership_categories ORDER BY id'
  );
  return res.rows;
}

async function getCategory(id) {
  const res = await query('SELECT * FROM membership_categories WHERE id = $1', [id]);
  return res.rows[0];
}

async function createCategory(c) {
  const res = await query(
    `INSERT INTO membership_categories
      (name, registration_fee, monthly_fee, referral_percent, withdrawal_limit, reward_multiplier, facilities)
     VALUES ($1,$2,$3,$4,$5,$6,$7)
     RETURNING *`,
    [c.name, c.registration_fee, c.monthly_fee, c.referral_percent, c.withdrawal_limit, c.reward_multiplier, c.facilities]
  );
  return res.rows[0];
}

async function updateCategory(id, c) {
  const res = await query(
    `UPDATE membership_categories SET
      name = $1, registration_fee = $2, monthly_fee = $3,
      referral_percent = $4, withdrawal_limit = $5, reward_multiplier = $6, facilities = $7
     WHERE id = $8
     RETURNING *`,
    [c.name, c.registration_fee, c.monthly_fee, c.referral_percent, c.withdrawal_limit, c.reward_multiplier, c.facilities, id]
  );
  return res.rows[0];
}

async function deleteCategory(id) {
  const res = await query(
    'DELETE FROM membership_categories WHERE id = $1 RETURNING id',
    [id]
  );
  return res.rows[0];
}

module.exports = {
  listCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
