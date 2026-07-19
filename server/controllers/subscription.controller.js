const subModel = require('../models/subscription.model');
const userModel = require('../models/user.model');
const { membershipStatus } = require('../utils/status');

async function mySubscription(req, res, next) {
  try {
    const user = await userModel.findById(req.user.id);
    const sub = await subModel.getLatestByUser(req.user.id);
    const info = membershipStatus(sub, user.account_status);

    res.json({
      category: sub ? sub.category_name : null,
      startDate: sub ? sub.start_date : null,
      expiryDate: info.expiryDate,
      remainingDays: info.remainingDays,
      status: info.status,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { mySubscription };
