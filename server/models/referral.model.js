const { query } = require('../db/pool');

async function findByReferralCode(code) {
  const res = await query('SELECT id FROM users WHERE referral_code = $1', [code]);
  return res.rows[0];
}

async function setReferralCode(userId) {
  const code = 'SPH-' + String(userId).padStart(6, '0');
  await query('UPDATE users SET referral_code = $1 WHERE id = $2', [code, userId]);
  return code;
}

async function getReferrerId(userId) {
  const res = await query('SELECT referred_by FROM users WHERE id = $1', [userId]);
  return res.rows[0]?.referred_by || null;
}

async function createBonus({ referrer_id, referred_user_id, payment_id, amount }) {
  const res = await query(
    `INSERT INTO referral_bonuses (referrer_id, referred_user_id, payment_id, amount)
     VALUES ($1,$2,$3,$4) RETURNING *`,
    [referrer_id, referred_user_id, payment_id, amount]
  );
  return res.rows[0];
}

// people this user referred
async function listReferred(userId) {
  const res = await query(
    `SELECT id, full_name, email, account_status, created_at
     FROM users WHERE referred_by = $1 ORDER BY created_at DESC`,
    [userId]
  );
  return res.rows;
}

async function bonusSummary(userId) {
  const res = await query(
    `SELECT COALESCE(SUM(amount),0) AS total, COUNT(*) AS count
     FROM referral_bonuses WHERE referrer_id = $1`,
    [userId]
  );
  return res.rows[0];
}

module.exports = {
  findByReferralCode,
  setReferralCode,
  getReferrerId,
  createBonus,
  listReferred,
  bonusSummary,
};
