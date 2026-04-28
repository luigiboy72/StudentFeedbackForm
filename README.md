# 🎓 Student Feedback System (MERN Stack)

A full-stack web application that allows students to submit feedback on courses, faculty, or institutions. Built using the **MERN stack** with secure authentication using **JWT (JSON Web Tokens)**.

---

## 🚀 Features

- 🧑‍🎓 Student registration & login (JWT-based authentication)
- 📝 Submit feedback for courses/faculty
- 📊 View submitted feedback
- 🔐 Secure API endpoints with token-based authentication
- ⚡ Responsive frontend built with React
- 🌐 RESTful API using Express & Node.js
- 🗄️ MongoDB database for storing user and feedback data

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Axios

### Backend

- Node.js
- Express.js

### Database

- MongoDB (with Mongoose)

### Authentication

- JSON Web Tokens (JWT)
- bcrypt

---

## 📂 Project Structure

student-feedback-system/  
├── client/  
├── server/  
├── .env  
├── package.json  
└── README.md

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```
git clone https://github.com/luigiboy72/StudentFeedbackForm.git
cd StudentFeedbackForm
```

---

### 2️⃣ Install dependencies

Backend:

```
cd backend
npm install
```

Frontend:

```
cd ../frontend
npm install
```

---

### 3️⃣ Environment Variables

Create a `.env` file inside the `server` folder:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

### 4️⃣ Run the application

Start backend:

```
cd server
npm start
```

Start frontend:

```
cd client
npm start
```
---

Screenshots:
<img width="625" height="315" alt="2" src="https://github.com/user-attachments/assets/9d7a58ad-c30b-4ebb-8132-fc49e0a47e7f" />  
<img width="625" height="315" alt="3" src="https://github.com/user-attachments/assets/509462e8-21f7-4784-8af3-3d00920eef3b" />  
<img width="625" height="315" alt="4" src="https://github.com/user-attachments/assets/e85e7100-84c3-417b-81f0-3c1c50ca7787" />  

---

## 🔐 Authentication Flow

1. User registers with email & password
2. Password is hashed using bcrypt
3. On login, server generates a JWT token
4. Token is stored on client
5. Protected routes verify token

---

## 📡 API Endpoints

Auth Routes:  
POST /api/login

Feedback Routes:  
POST /api/feedback  
GET /api/student/courses

Admin Routes:  
GET /api/admin/faculty/:id  
GET /api/admin/course/:id  
GET /api/admin/participation  
GET /api/admin/faculties  
GET /api/admin/courses

---

## 🧪 Future Enhancements

- Filtering & search
- Notification System
- Security Enhancements
- Realtime features

---
