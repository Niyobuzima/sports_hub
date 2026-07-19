const categoryModel = require('../models/category.model');
const subModel = require('../models/subscription.model');
const paymentModel = require('../models/payment.model');
const referralModel = require('../models/referral.model');
const rewardModel = require('../models/reward.model');
const { addMonths, today } = require('../utils/dates');

async function createPayment(req, res, next) {
  try {
    const userId = req.user.id;
    const { category_id, payment_type, months_paid = 1 } = req.body;

    const category = await categoryModel.getCategory(Number(category_id));
    if (!category) return res.status(404).json({ error: 'Category not found' });

    let subscription = null;
    let amount;

    if (payment_type === 'registration') {
      amount = Number(category.registration_fee);
    } else {
      // monthly / renewal -> create or extend the subscription
      const months = Number(months_paid) || 1;
      amount = Number(category.monthly_fee) * months;

      const latest = await subModel.getLatestByUser(userId);
      if (latest && latest.expiry_date >= today()) {
        // still active: add months on top of current expiry
        const newExpiry = addMonths(latest.expiry_date, months);
        subscription = await subModel.extendSubscription(latest.id, newExpiry, category_id);
      } else {
        // no sub or expired: start fresh from today
        const start = today();
        const expiry = addMonths(start, months);
        subscription = await subModel.createSubscription({
          user_id: userId,
          category_id,
          start_date: start,
          expiry_date: expiry,
        });
      }
    }

    const payment = await paymentModel.createPayment({
      user_id: userId,
      subscription_id: subscription ? subscription.id : null,
      payment_type,
      months_paid: payment_type === 'monthly' ? Number(months_paid) || 1 : 1,
      amount,
    });

    // reward points for the payment
    const mult = Number(category.reward_multiplier) || 1;
    if (payment_type === 'registration') {
      await rewardModel.addPoints(userId, rewardModel.POINTS.registration, 'Registration');
    } else {
      const months = Number(months_paid) || 1;
      const pts = Math.round(rewardModel.POINTS.monthly * months * mult);
      await rewardModel.addPoints(userId, pts, 'Monthly payment');
    }

    // referral bonus: if this member was referred, credit the referrer a
    // percentage of this payment plus referral reward points
    let referralBonus = null;
    const referrerId = await referralModel.getReferrerId(userId);
    if (referrerId && Number(category.referral_percent) > 0) {
      const bonusAmount = +(amount * (Number(category.referral_percent) / 100)).toFixed(2);
      if (bonusAmount > 0) {
        referralBonus = await referralModel.createBonus({
          referrer_id: referrerId,
          referred_user_id: userId,
          payment_id: payment.id,
          amount: bonusAmount,
        });
        await rewardModel.addPoints(referrerId, rewardModel.POINTS.referral, 'Referral');
      }
    }

    res.status(201).json({ payment, subscription, referralBonus });
  } catch (err) {
    next(err);
  }
}

async function myPayments(req, res, next) {
  try {
    res.json({ payments: await paymentModel.listByUser(req.user.id) });
  } catch (err) {
    next(err);
  }
}

module.exports = { createPayment, myPayments };
