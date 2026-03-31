import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <>
      {!isLoggedIn ? (
        <Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} />
      ) : (
        <FeedbackPage setIsLoggedIn={setIsLoggedIn} user={user} />
      )}
    </>
  );
}

function Login({ setIsLoggedIn, setUser }) {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: loginData.username,
          password: loginData.password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setIsLoggedIn(true);
        setUser(data.user);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error");
    }
  };


  return (
    <div className="split-container">
      <div className="left-panel">
        <h1>Student Feedback Portal</h1>
        <p>Share your experience and help improve teaching quality.</p>
      </div>

      <div className="right-panel">
        <form className="form-card" onSubmit={handleLogin}>
          <h2>Login</h2>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

function FeedbackPage({ setIsLoggedIn, user }) {
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedTeacher ,setSelectedTeacher] = useState(null);
  const [rating1, setRating1] = useState(0);
  const [rating2, setRating2] = useState(0);
  const [rating3, setRating3] = useState(0);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/subjects")
      .then(res => res.json())
      .then(data => setSubjects(data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/teachers")
      .then(res => res.json())
      .then(data => setTeachers(data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const feedbackData = {
      student: user,
      teacher: selectedTeacher,
      subject: selectedSubject,
      lectureRating: rating1,
      materialRating: rating2,
      practiceRating: rating3,
      feedback: feedback
    };

    const response = await fetch("http://localhost:5000/feedback", {
      method: "POST",
      headers: {
       "Content-Type": "application/json",
      },
      body: JSON.stringify(feedbackData),
    });

    const data = await response.json();
    if (!data.success) {
      alert(data.message);
    } else {
      alert(data.message);
      setSelectedSubject(null);
      setSelectedTeacher(null);
      setRating1(0);
      setRating2(0);
      setRating3(0);
      setFeedback("");
    }
  }

  return (
    <div className="feedback-page">
      <div className="top-bar">
        <h2>Student Feedback System</h2>
        <button className="logout" onClick={() => setIsLoggedIn(false)}>
          Logout
        </button>
      </div>

      <div className="form-section">
        <form className="feedback-form" onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label>Select Subject</label>
            <select required value={selectedSubject?._id || ""}
            onChange={(e) => {
              const subject = subjects.find(s => s._id === e.target.value);
              setSelectedSubject(subject);
            }}>
              <option value="">Choose Subject</option>
              {subjects.map(subject => (
                <option key={subject._id} value={subject._id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Select Faculty</label>
            <select required value={selectedTeacher?._id || ""}
            disabled={!selectedSubject}
            onChange={(e) => {
              const teacher = teachers.find(s => s._id === e.target.value);
              setSelectedTeacher(teacher);
            }}>
              <option value="">Choose Faculty</option>

              {selectedSubject &&
                selectedSubject.teachers.map(teacher => (
                  <option key={teacher._id} value={teacher._id}>
                    {teacher.title} {teacher.name}
                  </option>
                ))
              }
            </select>
          </div>
          
          <table>
            <tr className="rating-group">
              <td><label>Quality of Lectures</label></td>
              <td className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={star <= rating1 ? "active" : ""}
                    onClick={() => setRating1(star)}
                  >
                    ★
                  </span>
                ))}
              </td>
            </tr>
            <tr className="rating-group">
              <td><label>Adequate Materials Sent</label></td>
              <td className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={star <= rating2 ? "active" : ""}
                    onClick={() => setRating2(star)}
                  >
                    ★
                  </span>
                ))}
              </td>
            </tr>
            <tr className="rating-group">
              <td><label>Practice Given During Class Hours</label></td>
              <td className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={star <= rating3 ? "active" : ""}
                    onClick={() => setRating3(star)}
                  >
                    ★
                  </span>
                ))}
              </td>
            </tr>
          </table>

          <div className="form-group">
            <label>Review</label>
            <textarea placeholder="Write your feedback..." required value={feedback}
            onChange={(e) => setFeedback(e.target.value)}>

            </textarea>
          </div>

          <button type="submit">Submit Feedback</button>

        </form>
      </div>
    </div>
  );
}

export default App;