import api from './axios';

export async function login(email, password) {
  const res = await api.post('/auth/login', { email, password });
  return res.data; // { token, user }
}

export async function register(data) {
  const res = await api.post('/auth/register', data);
  return res.data;
}

export async function getMe() {
  const res = await api.get('/auth/me');
  return res.data.user;
}
