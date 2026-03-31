import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <h1>Student Feedback System</h1>
          {user && (
            <button 
              className="logout-btn" 
              onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = '/';
              }}
            >
              Logout
            </button>
          )}
        </header>
        <main className="main-content">
          <Routes>
            <Route path="/" element={!token ? <Login /> : <Navigate to={user.role === 'admin' ? '/admin' : '/student'} />} />
            <Route path="/student" element={token && user?.role === 'student' ? <StudentDashboard /> : <Navigate to="/" />} />
            <Route path="/admin" element={token && user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
export default App;
