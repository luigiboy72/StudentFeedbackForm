import axios from 'axios';

const API = axios.create({
  baseURL: 'https://student-feedback-server.onrender.com/api',
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const login = (data) => API.post('/login', data);

// Student
export const getMyCourses = () => API.get('/student/courses');
export const submitFeedback = (data) => API.post('/feedback', data);

// Admin
export const getAdminFacultyStats = (id) => API.get(`/admin/faculty/${id}`);
export const getAdminCourseStats = (id) => API.get(`/admin/course/${id}`);
export const getAdminParticipation = () => API.get('/admin/participation');
export const getAllFaculties = () => API.get('/admin/faculties');
export const getAllCourses = () => API.get('/admin/courses');

export default API;
