import api from './axios';

export async function myReferrals() {
  const res = await api.get('/referrals/me');
  return res.data;
}
