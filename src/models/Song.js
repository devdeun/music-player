import mongoose from "mongoose";

const songSchema = new mongoose.Schema({});

const Song = mongoose.model("Song", songSchema);

export default Song;
