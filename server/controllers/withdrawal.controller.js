const withdrawalModel = require('../models/withdrawal.model');
const rewardModel = require('../models/reward.model');
const subModel = require('../models/subscription.model');
const categoryModel = require('../models/category.model');

async function withdraw(req, res, next) {
  try {
    const userId = req.user.id;
    const points = Number(req.body.points);
    if (!points || points <= 0) {
      return res.status(400).json({ error: 'Enter a valid number of points' });
    }

    // the withdrawal minimum comes from the member's current category
    const sub = await subModel.getLatestByUser(userId);
    if (!sub) {
      return res.status(400).json({ error: 'You need a membership to withdraw points' });
    }
    const category = await categoryModel.getCategory(sub.category_id);
    const minimum = Number(category.withdrawal_limit);

    const balance = await rewardModel.getBalance(userId);

    if (points < minimum) {
      return res
        .status(400)
        .json({ error: `Minimum withdrawal for ${category.name} is ${minimum} points` });
    }
    if (points > balance) {
      return res.status(400).json({ error: `Not enough points (balance ${balance})` });
    }

    await rewardModel.deductPoints(userId, points, 'Withdrawal');
    const withdrawal = await withdrawalModel.createWithdrawal(userId, points);
    const newBalance = await rewardModel.getBalance(userId);

    res.status(201).json({ withdrawal, balance: newBalance });
  } catch (err) {
    next(err);
  }
}

async function myWithdrawals(req, res, next) {
  try {
    res.json({ withdrawals: await withdrawalModel.listByUser(req.user.id) });
  } catch (err) {
    next(err);
  }
}

module.exports = { withdraw, myWithdrawals };
