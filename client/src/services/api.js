import axios from 'axios';

// 生产环境用环境变量指向 Railway 后端，开发环境走 Vite proxy
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
});

// Add JWT token to admin requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(error);
  }
);

// Public APIs
export const getVehicles = (params) => api.get('/vehicles', { params });
export const getVehicle = (id) => api.get(`/vehicles/${id}`);
export const getFeaturedVehicles = () => api.get('/vehicles/featured');
export const getBrands = () => api.get('/vehicles/brands');
export const submitInquiry = (data) => api.post('/inquiries', data);
export const login = (credentials) => api.post('/auth/login', credentials);

// Admin APIs (same endpoints, protected by JWT middleware)
export const getAllInquiries = (params) => api.get('/inquiries', { params });
export const updateInquiryStatus = (id, status) => api.put(`/inquiries/${id}/status`, { status });
export const createVehicle = (data) => api.post('/vehicles', data);
export const updateVehicle = (id, data) => api.put(`/vehicles/${id}`, data);
export const deleteVehicle = (id) => api.delete(`/vehicles/${id}`);
export const getDashboardStats = () => api.get('/admin/stats');

// Image Upload APIs (Cloudflare R2)
export const uploadImage = (file) => {
  const formData = new FormData();
  formData.append('image', file);
  return api.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const uploadMultipleImages = (files) => {
  const formData = new FormData();
  files.forEach(file => formData.append('images', file));
  return api.post('/upload/multiple', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const deleteImage = (key) => api.delete(`/upload/${key}`);

// Staff Management APIs
export const getStaffList = () => api.get('/staff');
export const createStaff = (data) => api.post('/staff', data);
export const updateStaff = (id, data) => api.put(`/staff/${id}`, data);
export const deleteStaff = (id) => api.delete(`/staff/${id}`);
export const toggleStaff = (id) => api.put(`/staff/${id}/toggle`);
export const changePassword = (data) => api.put('/auth/password', data);

export default api;
