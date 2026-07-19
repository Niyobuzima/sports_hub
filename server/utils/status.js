const { today } = require('./dates');

// work out membership status + days left from a subscription row
function membershipStatus(subscription, accountStatus) {
  if (accountStatus === 'suspended') {
    return { status: 'Suspended', remainingDays: 0, expiryDate: subscription?.expiry_date || null };
  }
  if (!subscription) {
    return { status: 'None', remainingDays: 0, expiryDate: null };
  }

  const now = new Date(today());
  const expiry = new Date(subscription.expiry_date);
  const remainingDays = Math.ceil((expiry - now) / (1000 * 60 * 60 * 24));

  let status;
  if (remainingDays < 0) status = 'Expired';
  else if (remainingDays <= 7) status = 'Expiring Soon';
  else status = 'Active';

  return {
    status,
    remainingDays: Math.max(remainingDays, 0),
    expiryDate: subscription.expiry_date,
  };
}

module.exports = { membershipStatus };
