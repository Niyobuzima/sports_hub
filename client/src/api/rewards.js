import api from './axios';

export async function myRewards() {
  const res = await api.get('/rewards/me');
  return res.data;
}
