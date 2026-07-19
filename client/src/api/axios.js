import axios from 'axios';

// in production the API is same-origin at /api (Vercel), locally use VITE_API_URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
});

// attach token if we have one
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
