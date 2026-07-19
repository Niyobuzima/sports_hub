import api from './axios';

export async function createPayment(data) {
  const res = await api.post('/payments', data);
  return res.data;
}

export async function myPayments() {
  const res = await api.get('/payments/me');
  return res.data.payments;
}
