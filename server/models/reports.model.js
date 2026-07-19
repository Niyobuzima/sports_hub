const { query } = require('../db/pool');

async function summary() {
  const one = async (sql) => (await query(sql)).rows[0];

  const members = await one(
    `SELECT COUNT(*) FROM users u JOIN roles r ON r.id = u.role_id WHERE r.name <> 'admin'`
  );
  const active = await one(
    `SELECT COUNT(*) FROM users u JOIN roles r ON r.id = u.role_id
     WHERE r.name <> 'admin' AND u.account_status = 'active'`
  );
  const expired = await one(
    `SELECT COUNT(*) FROM subscriptions WHERE expiry_date < CURRENT_DATE`
  );
  const monthRevenue = await one(
    `SELECT COALESCE(SUM(amount),0) AS total FROM payments
     WHERE date_trunc('month', paid_at) = date_trunc('month', CURRENT_DATE)`
  );
  const totalRevenue = await one(`SELECT COALESCE(SUM(amount),0) AS total FROM payments`);
  const referrals = await one(
    `SELECT COUNT(*) AS count, COALESCE(SUM(amount),0) AS total FROM referral_bonuses`
  );
  const pointsIssued = await one(
    `SELECT COALESCE(SUM(points),0) AS total FROM reward_transactions WHERE points > 0`
  );
  const withdrawn = await one(
    `SELECT COALESCE(SUM(points),0) AS total FROM point_withdrawals`
  );

  const categoryDist = (
    await query(
      `SELECT c.name, COUNT(s.id) AS members
       FROM membership_categories c
       LEFT JOIN subscriptions s ON s.category_id = c.id
       GROUP BY c.name ORDER BY c.name`
    )
  ).rows;

  const facilityUse = (
    await query(
      `SELECT f.name, COUNT(b.id) AS bookings
       FROM facilities f
       LEFT JOIN bookings b ON b.facility_id = f.id
       GROUP BY f.name ORDER BY f.name`
    )
  ).rows;

  return {
    totalMembers: Number(members.count),
    activeMembers: Number(active.count),
    expiredMemberships: Number(expired.count),
    monthlyRevenue: Number(monthRevenue.total),
    totalRevenue: Number(totalRevenue.total),
    referralCount: Number(referrals.count),
    referralBonusTotal: Number(referrals.total),
    pointsIssued: Number(pointsIssued.total),
    pointsWithdrawn: Number(withdrawn.total),
    categoryDistribution: categoryDist,
    facilityUtilization: facilityUse,
  };
}

async function recentTransactions() {
  const res = await query(
    `SELECT p.id, u.full_name, p.payment_type, p.amount, p.paid_at
     FROM payments p JOIN users u ON u.id = p.user_id
     ORDER BY p.paid_at DESC LIMIT 50`
  );
  return res.rows;
}

module.exports = { summary, recentTransactions };
