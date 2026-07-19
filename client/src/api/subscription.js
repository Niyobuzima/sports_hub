import api from './axios';

export async function mySubscription() {
  const res = await api.get('/subscriptions/me');
  return res.data;
}
