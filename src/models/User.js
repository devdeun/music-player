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
    type: [
      {
        id: {
          type: String,
          unique: true,
        },
        youtubeId: String,
        title: String,
        artist: String,
        thumbnail: String,
      },
    ],
    default: [],
  },
  settings: {
    type: Object,
    default: {
      playlistTitle: "",
      playlistImage: "",
    },
  },
});

const User = mongoose.model("User", userSchema);

export default User;
