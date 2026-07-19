const rewardModel = require('../models/reward.model');

async function myRewards(req, res, next) {
  try {
    const balance = await rewardModel.getBalance(req.user.id);
    const transactions = await rewardModel.listByUser(req.user.id);
    res.json({ balance, transactions });
  } catch (err) {
    next(err);
  }
}

module.exports = { myRewards };
