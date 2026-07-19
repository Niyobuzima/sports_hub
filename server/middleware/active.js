const userModel = require('../models/user.model');

// blocks pending/suspended/rejected users from member actions
async function requireActive(req, res, next) {
  try {
    const user = await userModel.findById(req.user.id);
    if (!user || user.account_status !== 'active') {
      return res.status(403).json({ error: 'Your account is not active' });
    }
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = { requireActive };
