const express = require('express');
const router = express.Router();

const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const { login } = require('../controllers/authController');
const { getCourses, submitFeedback } = require('../controllers/studentController');
const { 
  getFacultyStats, 
  getCourseStats, 
  getParticipation,
  getAllFaculties,
  getAllCourses 
} = require('../controllers/adminController');

// Auth
router.post('/login', login);

// Student
router.get('/student/courses', authMiddleware, getCourses);
router.post('/feedback', authMiddleware, submitFeedback);

// Admin
router.get('/admin/faculty/:id', authMiddleware, adminMiddleware, getFacultyStats);
router.get('/admin/course/:id', authMiddleware, adminMiddleware, getCourseStats);
router.get('/admin/participation', authMiddleware, adminMiddleware, getParticipation);
router.get('/admin/faculties', authMiddleware, adminMiddleware, getAllFaculties);
router.get('/admin/courses', authMiddleware, adminMiddleware, getAllCourses);

module.exports = router;
