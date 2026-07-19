import api from './axios';

export async function myNotifications() {
  const res = await api.get('/notifications/me');
  return res.data; // { notifications, unread }
}

export async function markAllRead() {
  const res = await api.post('/notifications/read');
  return res.data;
}
