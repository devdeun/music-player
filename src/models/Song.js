import mongoose from "mongoose";
import axios from "axios";

const songSchema = new mongoose.Schema({
  youtubeId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
});

const Song = mongoose.model("Song", songSchema);
export default Song;

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
        thumbnail: video.snippet.thumbnails.medium.url,
        channelTitle: video.snippet.channelTitle,
      };
    })
    .catch(err => {
      console.error(err);
    });
};

export const fetchYoutubeInfoFromKeyword = async keyword => {
  return await axios
    .get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${keyword}&type=video&key=${process.env.YOUTUBE_API_KEY}`
    )
    .then(response => {
      const video = response.data.items[0];
      return {
        id: video.id.videoId,
        thumbnail: video.snippet.thumbnails.medium.url,
      };
    })
    .catch(err => {
      console.error(err);
    });
};
