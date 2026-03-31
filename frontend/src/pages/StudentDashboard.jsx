import { useState, useEffect } from 'react';
import { getMyCourses, submitFeedback } from '../services/api';

const courseQuestions = [
  "How clear were the course objectives?",
  "How well was the course organized?",
  "How relevant was the course material?",
  "How fair were the assessments?",
  "Overall rating of the course?"
];

const facultyQuestions = [
  "How clear was the instructor's communication?",
  "How approachable was the instructor?",
  "How effective were the teaching methods?",
  "How timely was the feedback on assignments?",
  "Overall rating of the instructor?"
];

const StarRating = ({ question, value, onChange }) => {
  return (
    <div className="rating-group">
      <label>{question}</label>
      <div className="stars">
        {[1, 2, 3, 4, 5].map(star => (
          <span 
            key={star} 
            className={`star ${value >= star ? 'active' : ''}`}
            onClick={() => onChange(star)}
          >
            ★
          </span>
        ))}
      </div>
    </div>
  );
};

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourseEnrolment, setSelectedCourseEnrolment] = useState(null);
  
  const [courseRatings, setCourseRatings] = useState([0,0,0,0,0]);
  const [courseComment, setCourseComment] = useState('');
  
  const [facultyRatings, setFacultyRatings] = useState([0,0,0,0,0]);
  const [facultyComment, setFacultyComment] = useState('');
  
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    getMyCourses().then(res => setCourses(res.data)).catch(console.error);
  }, []);

  const handleCourseChange = (e) => {
    const enrol = courses.find(c => c.courseId._id === e.target.value);
    setSelectedCourseEnrolment(enrol);
    setCourseRatings([0,0,0,0,0]);
    setFacultyRatings([0,0,0,0,0]);
    setMessage({ text: '', type: '' });
  };

  const handleRatingChange = (section, idx, val) => {
    if (section === 'course') {
      const newR = [...courseRatings];
      newR[idx] = val;
      setCourseRatings(newR);
    } else {
      const newR = [...facultyRatings];
      newR[idx] = val;
      setFacultyRatings(newR);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (courseRatings.includes(0) || facultyRatings.includes(0)) {
      setMessage({ text: 'Please rate all questions', type: 'error' });
      return;
    }
    
    try {
      await submitFeedback({
        courseId: selectedCourseEnrolment.courseId._id,
        facultyId: selectedCourseEnrolment.facultyId._id,
        courseRatings,
        courseComment,
        facultyRatings,
        facultyComment
      });
      setMessage({ text: 'Feedback submitted successfully!', type: 'success' });
      setCourseRatings([0,0,0,0,0]);
      setFacultyRatings([0,0,0,0,0]);
      setCourseComment('');
      setFacultyComment('');
    } catch (err) {
      setMessage({ text: err.response?.data?.message || 'Submission failed', type: 'error' });
    }
  };

  return (
    <div className="dashboard">
      <h2>Student Feedback Form</h2>
      
      <div className="card" style={{ marginTop: '2rem' }}>
        <div className="form-group">
          <label>Select Course</label>
          <select onChange={handleCourseChange} defaultValue="">
            <option value="" disabled>Select a course</option>
            {courses.map(enrol => (
              <option key={enrol.courseId._id} value={enrol.courseId._id}>
                {enrol.courseId.courseCode} - {enrol.courseId.courseName}
              </option>
            ))}
          </select>
        </div>
        
        {selectedCourseEnrolment && (
          <div style={{ marginTop: '1rem', padding: '1rem', background: '#f1faee', borderRadius: '8px' }}>
            <strong>Assigned Faculty:</strong> {selectedCourseEnrolment.facultyId.name} ({selectedCourseEnrolment.facultyId.department})
          </div>
        )}
      </div>

      {selectedCourseEnrolment && (
        <form onSubmit={handleSubmit}>
          <div className="card">
            <h3>Section A: Course Review</h3>
            {courseQuestions.map((q, i) => (
              <StarRating 
                key={i} 
                question={q} 
                value={courseRatings[i]} 
                onChange={(val) => handleRatingChange('course', i, val)} 
              />
            ))}
            <div className="form-group" style={{ marginTop: '1.5rem' }}>
              <label>Additional Comments about the Course</label>
              <textarea 
                rows="3" 
                value={courseComment} 
                onChange={e => setCourseComment(e.target.value)}
                placeholder="Share your thoughts..."
              />
            </div>
          </div>

          <div className="card">
            <h3>Section B: Faculty Review</h3>
            {facultyQuestions.map((q, i) => (
              <StarRating 
                key={i} 
                question={q} 
                value={facultyRatings[i]} 
                onChange={(val) => handleRatingChange('faculty', i, val)} 
              />
            ))}
            <div className="form-group" style={{ marginTop: '1.5rem' }}>
              <label>Additional Comments about the Faculty</label>
              <textarea 
                rows="3" 
                value={facultyComment} 
                onChange={e => setFacultyComment(e.target.value)}
                placeholder="Share your thoughts..."
              />
            </div>
          </div>

          {message.text && (
            <div style={{ padding: '1rem', marginBottom: '1rem', borderRadius: '8px', color: '#fff', background: message.type === 'error' ? 'var(--danger)' : 'var(--success)' }}>
              {message.text}
            </div>
          )}
          
          <button type="submit" className="btn" style={{ marginBottom: '4rem' }}>Submit Feedback</button>
        </form>
      )}
    </div>
  );
};

export default StudentDashboard;
