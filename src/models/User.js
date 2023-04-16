import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userID: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: String,
  playlist: {
    type: Array,
    default: [],
  },
});

const User = mongoose.model("User", userSchema);

export default User;
