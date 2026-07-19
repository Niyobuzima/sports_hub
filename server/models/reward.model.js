const { query } = require('../db/pool');

// base points per action (multiplied by category reward_multiplier where relevant)
const POINTS = {
  registration: 50,
  monthly: 20,
  referral: 100,
  booking: 10,
};

async function addPoints(userId, points, reason) {
  if (!points) return;
  await query(
    'INSERT INTO reward_transactions (user_id, points, reason) VALUES ($1,$2,$3)',
    [userId, points, reason]
  );
  await query('UPDATE users SET reward_points = reward_points + $1 WHERE id = $2', [
    points,
    userId,
  ]);
}

async function deductPoints(userId, points, reason) {
  await query(
    'INSERT INTO reward_transactions (user_id, points, reason) VALUES ($1,$2,$3)',
    [userId, -Math.abs(points), reason]
  );
  await query('UPDATE users SET reward_points = reward_points - $1 WHERE id = $2', [
    Math.abs(points),
    userId,
  ]);
}

async function getBalance(userId) {
  const res = await query('SELECT reward_points FROM users WHERE id = $1', [userId]);
  return res.rows[0]?.reward_points ?? 0;
}

async function listByUser(userId) {
  const res = await query(
    'SELECT * FROM reward_transactions WHERE user_id = $1 ORDER BY created_at DESC',
    [userId]
  );
  return res.rows;
}

module.exports = { POINTS, addPoints, deductPoints, getBalance, listByUser };
