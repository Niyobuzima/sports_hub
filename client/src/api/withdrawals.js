import api from './axios';

export async function withdrawPoints(points) {
  const res = await api.post('/withdrawals', { points });
  return res.data;
}

export async function myWithdrawals() {
  const res = await api.get('/withdrawals/me');
  return res.data.withdrawals;
}
