import api from './axios';

export async function reportSummary() {
  const res = await api.get('/reports/summary');
  return res.data;
}

export async function reportTransactions() {
  const res = await api.get('/reports/transactions');
  return res.data.transactions;
}
