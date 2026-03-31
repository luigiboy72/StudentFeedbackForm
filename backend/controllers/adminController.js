const Feedback = require('../models/Feedback');
const User = require('../models/User');
const Course = require('../models/Course');
const Faculty = require('../models/Faculty');

const getFacultyStats = async (req, res) => {
  try {
    const facultyId = req.params.id;
    const feedbacks = await Feedback.find({ facultyId });
    const faculty = await Faculty.findById(facultyId);

    if (!faculty) return res.status(404).json({ message: 'Faculty not found' });

    let totalRating = 0;
    let count = 0;
    const anonymousFeedbacks = feedbacks.map(f => {
      const avg = f.facultyRatings.reduce((a,b)=>a+b, 0) / 5;
      totalRating += avg;
      count++;
      return { ratings: f.facultyRatings, comment: f.facultyComment, timestamp: f.timestamp };
    });

    res.json({
      faculty,
      averageRating: count ? (totalRating / count).toFixed(2) : 0,
      feedbacks: anonymousFeedbacks
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const getCourseStats = async (req, res) => {
  try {
    const courseId = req.params.id;
    const feedbacks = await Feedback.find({ courseId }).populate('facultyId', 'name');
    const course = await Course.findById(courseId);

    if (!course) return res.status(404).json({ message: 'Course not found' });

    let totalRating = 0;
    let count = 0;
    
    // Calculate faculties teaching this course from feedbacks, actually faculties are mapped in User enrolled courses,
    // but easier to extract from feedback to get "faculties with received feedback".
    const facultyMap = {};

    const anonymousFeedbacks = feedbacks.map(f => {
      const avg = f.courseRatings.reduce((a,b)=>a+b, 0) / 5;
      totalRating += avg;
      count++;
      
      const facIdStr = f.facultyId._id.toString();
      if (!facultyMap[facIdStr]) {
        facultyMap[facIdStr] = { name: f.facultyId.name, total: 0, count: 0 };
      }
      const facAvg = f.facultyRatings.reduce((a,b)=>a+b, 0) / 5;
      facultyMap[facIdStr].total += facAvg;
      facultyMap[facIdStr].count++;

      return { ratings: f.courseRatings, comment: f.courseComment, timestamp: f.timestamp };
    });

    const faculties = Object.values(facultyMap).map(f => ({
      name: f.name,
      averageRating: (f.total / f.count).toFixed(2)
    }));

    res.json({
      course,
      averageRating: count ? (totalRating / count).toFixed(2) : 0,
      faculties,
      feedbacks: anonymousFeedbacks
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getParticipation = async (req, res) => {
  try {
    const students = await User.find({ role: 'student' }).select('name registrationNumber _id');
    const submitters = await Feedback.distinct('studentId');
    
    const submittedIds = submitters.map(id => id.toString());

    const participated = [];
    const notParticipated = [];

    students.forEach(student => {
      if (submittedIds.includes(student._id.toString())) {
        participated.push(student);
      } else {
        notParticipated.push(student);
      }
    });

    res.json({ participated, notParticipated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getAllFaculties = async (req, res) => {
  try {
    const faculties = await Faculty.find();
    res.json(faculties);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getFacultyStats, getCourseStats, getParticipation, getAllFaculties, getAllCourses };
