import { useState, useEffect } from 'react';
import { 
  getAdminFacultyStats, 
  getAdminCourseStats, 
  getAdminParticipation,
  getAllFaculties,
  getAllCourses
} from '../services/api';

const facultyQuestions = [
  "How clear was the instructor's communication?",
  "How approachable was the instructor?",
  "How effective were the teaching methods?",
  "How timely was the feedback on assignments?",
  "Overall rating of the instructor?"
];

const courseQuestions = [
  "How clear were the course objectives?",
  "How well was the course organized?",
  "How relevant was the course material?",
  "How fair were the assessments?",
  "Overall rating of the course?"
];

const getQuestionAverages = (feedbacks) => {
  if (!feedbacks || feedbacks.length === 0) return [0,0,0,0,0];
  const sums = [0,0,0,0,0];
  feedbacks.forEach(fb => {
    fb.ratings.forEach((r, i) => sums[i] += r);
  });
  return sums.map(s => (s / feedbacks.length).toFixed(1));
};

const DisplayStars = ({ rating }) => {
  const rounded = Math.round(Number(rating));
  return (
    <span style={{ color: '#ffd166', fontSize: '1.2rem', marginLeft: '0.5rem' }}>
      {'★'.repeat(rounded)}{'☆'.repeat(5 - rounded)} <span style={{fontSize: '0.9rem', color: '#666'}}>({Number(rating).toFixed(1)})</span>
    </span>
  );
};

const AdminDashboard = () => {
  const [faculties, setFaculties] = useState([]);
  const [courses, setCourses] = useState([]);
  
  const [selectedFacultyId, setSelectedFacultyId] = useState('');
  const [facultyStats, setFacultyStats] = useState(null);
  
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [courseStats, setCourseStats] = useState(null);
  
  const [participation, setParticipation] = useState(null);

  useEffect(() => {
    getAllFaculties().then(res => setFaculties(res.data)).catch(console.error);
    getAllCourses().then(res => setCourses(res.data)).catch(console.error);
    getAdminParticipation().then(res => setParticipation(res.data)).catch(console.error);
  }, []);

  const handleFacultySelect = async (e) => {
    const id = e.target.value;
    setSelectedFacultyId(id);
    if(id) {
      const res = await getAdminFacultyStats(id);
      setFacultyStats(res.data);
    }
  };

  const handleCourseSelect = async (e) => {
    const id = e.target.value;
    setSelectedCourseId(id);
    if (id) {
      const res = await getAdminCourseStats(id);
      setCourseStats(res.data);
    }
  };

  return (
    <div className="dashboard">
      <h2>Admin Dashboard</h2>
      
      {/* 1. Faculty Review */}
      <div className="card">
        <h3>Faculty Review</h3>
        <div className="form-group">
          <select onChange={handleFacultySelect} value={selectedFacultyId}>
            <option value="" disabled>Select a Faculty</option>
            {faculties.map(f => (
              <option key={f._id} value={f._id}>{f.name} ({f.department})</option>
            ))}
          </select>
        </div>
        
        {facultyStats && (
          <div>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '1rem'}}>
              <h4>{facultyStats.faculty.name}</h4>
              <span className="badge">Overall Avg: {facultyStats.averageRating} / 5</span>
            </div>
            
            <div style={{marginBottom: '1.5rem'}}>
              <h5>Average per Question:</h5>
              <ul className="list-group" style={{marginTop: '0.5rem', marginBottom: '1.5rem'}}>
                {getQuestionAverages(facultyStats.feedbacks).map((avg, i) => (
                  <li key={i} className="list-item" style={{padding: '0.5rem 1rem'}}>
                    <span>{facultyQuestions[i]}</span>
                    <DisplayStars rating={avg} />
                  </li>
                ))}
              </ul>
            </div>
            
            <h5>Anonymous Feedback:</h5>
            {facultyStats.feedbacks.length === 0 ? <p>No feedback yet.</p> : (
              <ul className="list-group">
                {facultyStats.feedbacks.map((fb, idx) => (
                  <li key={idx} className="list-item" style={{display: 'block'}}>
                    <div style={{marginBottom: '0.5rem'}}>
                      <strong>Ratings Given:</strong>
                      <ul style={{marginLeft: '1.5rem', marginTop: '0.25rem', paddingLeft: '1rem'}}>
                        {fb.ratings.map((r, i) => (
                          <li key={i} style={{marginBottom: '0.2rem', display: 'flex', alignItems: 'center'}}>{facultyQuestions[i]} <DisplayStars rating={r} /></li>
                        ))}
                      </ul>
                    </div>
                    {fb.comment && <div style={{marginTop: '0.5rem'}}><strong>Comment:</strong> {fb.comment}</div>}
                    <div style={{fontSize: '0.8rem', color: '#666', marginTop: '0.5rem'}}>
                      Submitted: {new Date(fb.timestamp).toLocaleString()}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      {/* 2. Course Review */}
      <div className="card">
        <h3>Course Review</h3>
        <div className="form-group">
          <select onChange={handleCourseSelect} value={selectedCourseId}>
            <option value="" disabled>Select a Course</option>
            {courses.map(c => (
              <option key={c._id} value={c._id}>{c.courseCode} - {c.courseName}</option>
            ))}
          </select>
        </div>

        {courseStats && (
          <div>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '1rem'}}>
              <h4>{courseStats.course.courseName}</h4>
              <span className="badge">Course Avg: {courseStats.averageRating} / 5</span>
            </div>

            <h5>Anonymous Course Feedback:</h5>
            {courseStats.feedbacks.length === 0 ? <p>No feedback yet.</p> : (
              <div style={{marginBottom: '2rem'}}>
                <div style={{marginBottom: '1.5rem'}}>
                  <h6>Average per Question:</h6>
                  <ul className="list-group" style={{marginTop: '0.5rem'}}>
                    {getQuestionAverages(courseStats.feedbacks).map((avg, i) => (
                      <li key={i} className="list-item" style={{padding: '0.5rem 1rem'}}>
                        <span>{courseQuestions[i]}</span>
                        <DisplayStars rating={avg} />
                      </li>
                    ))}
                  </ul>
                </div>
                <ul className="list-group">
                  {courseStats.feedbacks.map((fb, idx) => (
                    <li key={idx} className="list-item" style={{display: 'block'}}>
                      <div style={{marginBottom: '0.5rem'}}>
                        <strong>Ratings Given:</strong>
                        <ul style={{marginLeft: '1.5rem', marginTop: '0.25rem', paddingLeft: '1rem'}}>
                          {fb.ratings.map((r, i) => (
                            <li key={i} style={{marginBottom: '0.2rem', display: 'flex', alignItems: 'center'}}>{courseQuestions[i]} <DisplayStars rating={r} /></li>
                          ))}
                        </ul>
                      </div>
                      {fb.comment && <div style={{marginTop: '0.5rem'}}><strong>Comment:</strong> {fb.comment}</div>}
                      <div style={{fontSize: '0.8rem', color: '#666', marginTop: '0.5rem'}}>
                        Submitted: {new Date(fb.timestamp).toLocaleString()}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <h5>Faculties teaching this course:</h5>
            <ul className="list-group" style={{marginBottom: '1rem'}}>
              {courseStats.faculties.map((f, i) => (
                <li key={i} className="list-item">
                  <span>{f.name}</span>
                  <span className="badge">{f.averageRating}</span>
                </li>
              ))}
              {courseStats.faculties.length === 0 && <p>No facultiy feedback data yet.</p>}
            </ul>
          </div>
        )}
      </div>

      {/* 3. Student Participation */}
      <div className="card">
        <h3>Student Participation</h3>
        {participation && (
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem'}}>
            <div>
              <h5 style={{color: 'var(--success)', marginBottom: '1rem'}}>Participated</h5>
              <ul className="list-group">
                {participation.participated.map(s => (
                  <li key={s._id} className="list-item">{s.name} ({s.registrationNumber})</li>
                ))}
                {participation.participated.length === 0 && <p>None</p>}
              </ul>
            </div>
            <div>
              <h5 style={{color: 'var(--danger)', marginBottom: '1rem'}}>Not Participated</h5>
              <ul className="list-group">
                {participation.notParticipated.map(s => (
                  <li key={s._id} className="list-item">{s.name} ({s.registrationNumber})</li>
                ))}
                {participation.notParticipated.length === 0 && <p>None</p>}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
