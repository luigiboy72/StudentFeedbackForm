import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        select: false
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher"
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject"
    },
    lectureRating: Number,
    materialRating: Number,
    practiceRating: Number,
    feedback: String
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

export default Feedback;