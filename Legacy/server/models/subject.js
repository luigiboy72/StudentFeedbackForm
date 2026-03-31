import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
    name: String,
    teachers: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Teacher"
    }
});

const Subject = mongoose.model("Subject", subjectSchema);

export default Subject;