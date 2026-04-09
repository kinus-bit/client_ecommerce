import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers:{
        'Content-Type':'application/json',
    },
});

// API methods
export const getHealth = () => API.get('/health');
// Auth API methods
export const register = (userData) => API.post('/auth/register', userData);
export const verifyEmail = (token) => API.get(`/auth/verify-email/${token}`);
export const resendVerificationEmail = (email) => API.post('/auth/resend-verification', { email });
export const login = (credentials) => API.post('/auth/login', credentials);
export const forgotPassword = (email) => API.post('/auth/forgot-password', { email });
export const resetPassword = (token, password) => API.post(`/auth/reset-password/${token}`, { password });
export const changePassword = (passwords) => API.put('/auth/change-password', passwords);
export const getMe = () => API.get('/auth/me');
export const updateProfile = (profileData) => API.put('/auth/profile', profileData);
export const logout = () => API.get('/auth/logout');

