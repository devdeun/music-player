// import mongoose from "mongoose";
// const songSchema = new mongoose.Schema({});
// const Song = mongoose.model("Song", songSchema);
// export default Song;

import axios from "axios";

export const searchSongFromAPI = async keyword => {
  const url = `https://ws.audioscrobbler.com/2.0/?method=track.search&track=${keyword}&api_key=${process.env.LASTFM_API_KEY}&format=json`;
  return await axios
    .get(url)
    .then(response => {
      const songList = response.data.results.trackmatches.track;
      return songList;
    })
    .catch(err => {
      console.error(err);
    });
};
