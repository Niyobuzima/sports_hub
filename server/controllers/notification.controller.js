const model = require('../models/notification.model');

async function myNotifications(req, res, next) {
  try {
    const notifications = await model.listByUser(req.user.id);
    const unread = await model.unreadCount(req.user.id);
    res.json({ notifications, unread });
  } catch (err) {
    next(err);
  }
}

async function markRead(req, res, next) {
  try {
    await model.markAllRead(req.user.id);
    res.json({ message: 'All marked as read' });
  } catch (err) {
    next(err);
  }
}

module.exports = { myNotifications, markRead };
