export const getPlaylistItem = ({ title, artist, thumbnail }) => {
  const $li = document.createElement("li");
  $li.classList.add("music-playlist-item");
  $li.innerHTML = `
  <img class="music-playlist-song-img" src="${thumbnail}" alt="" />
  <div class="music-playlist-song-info-container">
    <p class="music-playlist-song-title">${title}</p>
    <p class="music-playlist-song-artist">${artist}</p>
  </div>
  `;
  return $li;
};

export const getPlaylistItemButton = ({
  id,
  youtubeId,
  title,
  artist,
  thumbnail,
}) => {
  const $button = document.createElement("button");
  $button.classList.add("material-icons", "playlist-song-play-button");
  $button.dataset.id = id;
  $button.dataset.youtubeId = youtubeId;
  $button.dataset.title = title;
  $button.dataset.artist = artist;
  $button.dataset.thumbnail = thumbnail;
  $button.innerText = "play_arrow";
  return $button;
};
