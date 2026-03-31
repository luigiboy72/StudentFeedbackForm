const User = require('../models/User');
const Feedback = require('../models/Feedback');
const Course = require('../models/Course');
const Faculty = require('../models/Faculty');

const getCourses = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('enrolledCourses.courseId').populate('enrolledCourses.facultyId');
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    res.json(user.enrolledCourses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const submitFeedback = async (req, res) => {
  try {
    const { courseId, facultyId, courseRatings, courseComment, facultyRatings, facultyComment } = req.body;
    
    // Check if feedback already exists for this course by this student
    const existing = await Feedback.findOne({ studentId: req.user.id, courseId });
    if (existing) {
      return res.status(400).json({ message: 'Feedback already submitted for this course' });
    }

    const newFeedback = new Feedback({
      studentId: req.user.id,
      courseId,
      facultyId,
      courseRatings,
      courseComment,
      facultyRatings,
      facultyComment
    });

    await newFeedback.save();
    res.json({ message: 'Feedback submitted successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getCourses, submitFeedback };
