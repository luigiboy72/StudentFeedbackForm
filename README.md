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
git clone https://github.com/your-username/student-feedback-system.git
cd student-feedback-system
```
---

### 2️⃣ Install dependencies

Backend:
cd server
npm install

Frontend:
cd ../client
npm install

---

### 3️⃣ Environment Variables

Create a `.env` file inside the `server` folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

---

### 4️⃣ Run the application

Start backend:
cd server
npm start

Start frontend:
cd client
npm start

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
POST /api/auth/register  
POST /api/auth/login  

Feedback Routes:
POST /api/feedback  
GET /api/feedback  

---

## 🧪 Future Enhancements

- Admin dashboard  
- Feedback analytics  
- Filtering & search  

---

## 📄 License

MIT License
