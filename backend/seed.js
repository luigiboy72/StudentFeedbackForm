require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Course = require('./models/Course');
const Faculty = require('./models/Faculty');
const Feedback = require('./models/Feedback');

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/feedback_system')
  .then(async () => {
    console.log('Connected to DB');

    // Clear existing
    await User.deleteMany({});
    await Course.deleteMany({});
    await Faculty.deleteMany({});
    await Feedback.deleteMany({});

    // Create Faculty
    const fac1 = await Faculty.create({ name: 'Dr. Smith', department: 'Computer Science' });
    const fac2 = await Faculty.create({ name: 'Prof. Johnson', department: 'Information Tech' });
    const fac3 = await Faculty.create({ name: 'Dr. Alan Turing', department: 'Computer Science' });
    const fac4 = await Faculty.create({ name: 'Prof. Marie Curie', department: 'Chemistry' });
    const fac5 = await Faculty.create({ name: 'Dr. Albert Einstein', department: 'Physics' });

    // Create Courses
    const course1 = await Course.create({ courseCode: 'CS101', courseName: 'Web Programming' });
    const course2 = await Course.create({ courseCode: 'CS201', courseName: 'Data Structures' });
    const course3 = await Course.create({ courseCode: 'CS301', courseName: 'Advanced Machine Learning' });
    const course4 = await Course.create({ courseCode: 'CH102', courseName: 'Organic Chemistry' });
    const course5 = await Course.create({ courseCode: 'PHY401', courseName: 'Quantum Mechanics' });

    // Create Admin
    await User.create({
      registrationNumber: 'admin',
      password: 'admin',
      role: 'admin',
      name: 'Site Administrator'
    });

    // Create Students
    await User.create({
      registrationNumber: '24BRS1030',
      password: 'password123',
      role: 'student',
      name: 'Mohamed Reihan',
      enrolledCourses: [
        { courseId: course1._id, facultyId: fac1._id },
        { courseId: course2._id, facultyId: fac2._id }
      ]
    });

    await User.create({
      registrationNumber: '24BRS1014',
      password: 'password123',
      role: 'student',
      name: 'Velamuri Satya Sahiti',
      enrolledCourses: [
        { courseId: course1._id, facultyId: fac1._id }
      ]
    });

    await User.create({
      registrationNumber: '24BRS1192',
      password: 'password123',
      role: 'student',
      name: 'Swarit M',
      enrolledCourses: [
        { courseId: course3._id, facultyId: fac3._id },
        { courseId: course4._id, facultyId: fac4._id }
      ]
    });

    await User.create({
      registrationNumber: '24BRS1354',
      password: 'password123',
      role: 'student',
      name: 'Suraj Jackson',
      enrolledCourses: [
        { courseId: course4._id, facultyId: fac4._id },
        { courseId: course5._id, facultyId: fac5._id }
      ]
    });

    console.log('Dummy data seeded');
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
