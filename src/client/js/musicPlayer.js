import MusicPlayer from "./components/MusicPlayer";

const getSearchResultFromUrl = async searchValue => {
  return await fetch(`/youtubeUrl?url=${searchValue}`, {
    method: "GET",
  })
    .then(response => response.json())
    .catch(err => {
      return false;
    });
};
const renderSearchResult = ({ id, title, channelTitle, thumbnail }) => {
  const $thumbnail = document.querySelector(".search-result-img");
  const $titleInput = document.querySelector(".search-title-input");
  const $channelTitleInput = document.querySelector(".search-artist-input");
  $thumbnail.src = thumbnail;
  $titleInput.value = title;
  $titleInput.dataset.id = id;
  $channelTitleInput.value = channelTitle;
};

export const renderPlaylist = ({ id, title, artist, thumbnail }) => {
  const $playlist = document.querySelector(".music-playlist");
  const $li = document.createElement("li");
  const $button = document.createElement("button");
  $li.dataset.id = id;
  $li.classList.add("music-playlist-item");
  $li.innerHTML = `
    <img class="music-playlist-song-img" src="${thumbnail}" alt="" />
    <div class="music-playlist-song-info-container">
      <p class="music-playlist-song-title">${title}</p>
      <p class="music-playlist-song-artist">${artist}</p>
    </div>
  `;
  $button.classList.add("material-icons", "playlist-song-play-button");
  $button.innerText = "play_arrow";
  $li.appendChild($button);
  $playlist.appendChild($li);

  const $emptyMessage = document.querySelector(".playlist-empty-message");
  if (!$emptyMessage.classList.contains("hide")) {
    $emptyMessage.classList.add("hide");
  }
};

const handleSearchSubmit = async event => {
  event.preventDefault();
  const $searchInput = document.querySelector(".search-input");
  const $searchResultForm = document.querySelector("#search-result-form");
  const searchValue = $searchInput.value;
  $searchInput.value = "";
  const result = await getSearchResultFromUrl(searchValue);
  if (!result) {
    alert("검색 결과가 없습니다. 올바른 URL을 입력해주세요.");
    return;
  }
  renderSearchResult(result);
  $searchResultForm.classList.add("open");
};

const handleSearchResultSubmit = (event, musicPlayer) => {
  event.preventDefault();
  const $searchResultForm = document.querySelector("#search-result-form");
  const $titleInput = document.querySelector(".search-title-input");
  const $channelTitleInput = document.querySelector(".search-artist-input");
  const $img = document.querySelector(".search-result-img");
  $searchResultForm.classList.remove("open");
  const songInfo = {
    id: $titleInput.dataset.id,
    title: $titleInput.value,
    artist: $channelTitleInput.value,
    thumbnail: $img.src,
  };
  renderPlaylist(songInfo);
  musicPlayer.setPlaylist(songInfo);
};

const handlePlaylistSongClick = async (event, musicPlayer) => {
  const $li = event.target.closest("li");
  const $button = $li.querySelector(".playlist-song-play-button");
  const videoId = $li.dataset.id;

  if ($button.innerText === "play_arrow") {
    const title = $li.querySelector(".music-playlist-song-title").innerText;
    const artist = $li.querySelector(".music-playlist-song-artist").innerText;
    const songInfo = `${title} - ${artist}`;
    $button.innerText = "pause";
    if (musicPlayer.getCurrentSongId() === videoId) {
      musicPlayer.play();
      return;
    }
    if (!musicPlayer.player) musicPlayer.setPlayer();
    musicPlayer.updateCurrentSong(videoId, songInfo);
    $button.innerText = "pause";

    const $songlist = document.querySelectorAll(".music-playlist-item");
    $songlist.forEach($song => {
      if ($song.dataset.id === videoId) return;
      const $button = $song.querySelector(".playlist-song-play-button");
      $button.innerText = "play_arrow";
    });
  } else {
    $button.innerText = "play_arrow";
    musicPlayer.pause();
  }
};

const handleSearchResultCancel = event => {
  event.preventDefault();
  const $searchResultForm = document.querySelector("#search-result-form");
  $searchResultForm.classList.remove("open");
  $searchResultForm.reset();
};

export const initMusicPlayer = () => {
  const $searchForm = document.querySelector("#search-form");
  const $searchResultForm = document.querySelector("#search-result-form");
  const $searchFormCancelBtn = document.querySelector(
    ".search-result-cancel-button"
  );
  const $playlist = document.querySelector(".music-playlist");
  const musicPlayer = new MusicPlayer();
  musicPlayer.init();

  $searchForm.addEventListener("submit", handleSearchSubmit);
  $searchResultForm.addEventListener("submit", event =>
    handleSearchResultSubmit(event, musicPlayer)
  );
  $playlist.addEventListener("click", event =>
    handlePlaylistSongClick(event, musicPlayer)
  );
  $searchFormCancelBtn.addEventListener("click", handleSearchResultCancel);
};
