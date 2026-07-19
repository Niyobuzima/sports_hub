import api from './axios';

export async function listRegistrations() {
  const res = await api.get('/registrations');
  return res.data.registrations;
}

export async function updateRegistration(userId, action) {
  const res = await api.patch(`/registrations/${userId}/status`, { action });
  return res.data;
}
