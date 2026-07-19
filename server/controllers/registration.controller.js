const regModel = require('../models/registration.model');
const { notify } = require('../models/notification.model');

const NOTIFY_MSG = {
  approve: 'Your registration has been approved. Welcome!',
  reject: 'Your registration was rejected.',
  suspend: 'Your account has been suspended.',
  activate: 'Your account has been re-activated.',
};

// action -> resulting statuses
const ACTIONS = {
  approve: { account: 'active', reg: 'approved' },
  reject: { account: 'rejected', reg: 'rejected' },
  suspend: { account: 'suspended', reg: 'suspended' },
  activate: { account: 'active', reg: 'approved' },
};

async function list(req, res, next) {
  try {
    const rows = await regModel.listRegistrations();
    res.json({ registrations: rows });
  } catch (err) {
    next(err);
  }
}

async function updateStatus(req, res, next) {
  try {
    const userId = Number(req.params.userId);
    const { action } = req.body;
    const map = ACTIONS[action];
    if (!map) {
      return res.status(400).json({ error: 'Invalid action' });
    }
    const updated = await regModel.reviewRegistration({
      userId,
      accountStatus: map.account,
      regStatus: map.reg,
      adminId: req.user.id,
    });
    if (!updated) {
      return res.status(404).json({ error: 'Registration not found' });
    }
    await notify(userId, NOTIFY_MSG[action]);
    res.json({ message: `Registration ${map.reg}`, status: updated.status });
  } catch (err) {
    next(err);
  }
}

module.exports = { list, updateStatus };
