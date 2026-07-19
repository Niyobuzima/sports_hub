const referralModel = require('../models/referral.model');
const userModel = require('../models/user.model');

async function myReferrals(req, res, next) {
  try {
    const user = await userModel.findById(req.user.id);
    const referred = await referralModel.listReferred(req.user.id);
    const summary = await referralModel.bonusSummary(req.user.id);

    res.json({
      referralCode: user.referral_code,
      referredCount: referred.length,
      referred,
      totalBonus: summary.total,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { myReferrals };
