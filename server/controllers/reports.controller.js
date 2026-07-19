const reportsModel = require('../models/reports.model');

async function summary(req, res, next) {
  try {
    res.json(await reportsModel.summary());
  } catch (err) {
    next(err);
  }
}

async function transactions(req, res, next) {
  try {
    res.json({ transactions: await reportsModel.recentTransactions() });
  } catch (err) {
    next(err);
  }
}

module.exports = { summary, transactions };
