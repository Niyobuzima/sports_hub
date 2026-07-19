const { query } = require('../db/pool');

async function notify(userId, message) {
  if (!userId) return;
  await query('INSERT INTO notifications (user_id, message) VALUES ($1,$2)', [
    userId,
    message,
  ]);
}

async function listByUser(userId) {
  const res = await query(
    'SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC LIMIT 50',
    [userId]
  );
  return res.rows;
}

async function unreadCount(userId) {
  const res = await query(
    'SELECT COUNT(*) FROM notifications WHERE user_id = $1 AND is_read = false',
    [userId]
  );
  return Number(res.rows[0].count);
}

async function markAllRead(userId) {
  await query('UPDATE notifications SET is_read = true WHERE user_id = $1', [userId]);
}

module.exports = { notify, listByUser, unreadCount, markAllRead };
