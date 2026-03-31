import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  isAdmin: Boolean,
  subjects: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Subject"
  }
});

const User = mongoose.model("User", userSchema);

export default User;