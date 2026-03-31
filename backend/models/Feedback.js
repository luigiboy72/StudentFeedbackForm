const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  facultyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Faculty',
    required: true
  },
  courseRatings: {
    type: [Number],
    required: true,
    validate: [arr => arr.length === 5, 'Requires 5 course ratings']
  },
  courseComment: {
    type: String,
    default: ''
  },
  facultyRatings: {
    type: [Number],
    required: true,
    validate: [arr => arr.length === 5, 'Requires 5 faculty ratings']
  },
  facultyComment: {
    type: String,
    default: ''
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Feedback', feedbackSchema);
