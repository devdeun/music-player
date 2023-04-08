// import mongoose from "mongoose";
// const songSchema = new mongoose.Schema({});
// const Song = mongoose.model("Song", songSchema);
// export default Song;

import axios from "axios";

export const fetchYoutubeInfoFromUrl = async url => {
  const getVideoIdFromUrl = url => {
    const match = url.match(/(?:\/|%3D|v=)([0-9A-Za-z_-]{11}).*/);
    return match ? match[1] : null;
  };
  const videoId = getVideoIdFromUrl(url);
  if (!videoId) return;

  return await axios
    .get(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${process.env.YOUTUBE_API_KEY}`
    )
    .then(response => {
      const video = response.data.items[0];
      return {
        id: video.id,
        title: video.snippet.title,
        thumbnail: video.snippet.thumbnails.high.url,
        channelTitle: video.snippet.channelTitle,
      };
    })
    .catch(err => {
      console.error(err);
    });
};
