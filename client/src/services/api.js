import axios from 'axios';

const baseURL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, '') || 'http://localhost:5000';

/**
 * Shared Axios instance — attach interceptors here as the app grows
 * (e.g. attach Bearer token, handle 401 refresh flow).
 */
export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15_000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
