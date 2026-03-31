import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import User from "./models/user.js";
import Subject from "./models/subject.js";
import Teacher from "./models/teacher.js";
import Feedback from "./models/feedback.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.post("/login", async (req, res) => {
  const { username, password, isAdmin } = req.body;

  try {
    const user = await User.findOne({username: username});
    if (!user) {
        return res.json({user: null, success: false, message: "User not found"});
    }
    if (user.password !== password) {
        return res.json({user: null, success: false, message: "Incorrect password"});
    }
    res.json({user: user, success: true, message: "Login successful"});
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/subjects", async (req, res) => {
  try {
    const subjects = await Subject.find().populate("teachers");
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/teachers", async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/feedback", async (req, res) => {
  const { student, teacher, subject, lectureRating, materialRating, practiceRating, feedback } = req.body;
  try {
    const updatedFeedback = await Feedback.findOneAndUpdate(
      {
        student: student,
        teacher: teacher,
        subject: subject,
      },
      {
        lectureRating,
        materialRating,
        practiceRating,
        feedback,
      },
      {
        new: true,
        upsert: true,
      }
    );
    if (updatedFeedback) {
      return res.json({feedback: updatedFeedback, success: true, message: "Success"});
    } else {
      return res.json({feedback: null, success: false, message: "Submit failed"});
    }
  } catch (err) {
    res.status(500).json({error: err.message});
  }
})

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
