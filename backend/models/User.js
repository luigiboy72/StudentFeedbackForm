const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  registrationNumber: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['student', 'admin'],
    default: 'student'
  },
  name: {
    type: String,
    required: true
  },
  enrolledCourses: [{
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    },
    facultyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Faculty'
    }
  }]
});

module.exports = mongoose.model('User', userSchema);
