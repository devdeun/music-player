import YoutubePlayer from "./components/YoutubePlayer";

const getSearchResultFromUrl = async searchValue => {
  return await fetch(`/youtubeUrl?url=${searchValue}`, {
    method: "GET",
  })
    .then(response => response.json())
    .catch(err => console.error(err));
};
const renderSearchResult = ({ title, channelTitle, thumbnail }) => {
  const $searchResult = document.querySelector(".search-result");
  $searchResult.innerHTML = `
    <h3>${title} by ${channelTitle}</h3>
    <img src="${thumbnail}" alt="" />
  `;
};

const renderPlaylist = ({ id, title, channelTitle, thumbnail }) => {
  const $playlist = document.querySelector(".music-playlist");
  const $li = document.createElement("li");
  $li.dataset.id = id;
  $li.innerHTML = `
    <h3>${title} by ${channelTitle}</h3>
    <img src="${thumbnail}" alt="" />
  `;
  $playlist.appendChild($li);
};

const handleSearchSubmit = async event => {
  event.preventDefault();
  const $searchInput = document.querySelector(".search-input");
  const searchValue = $searchInput.value;
  $searchInput.value = "";
  const result = await getSearchResultFromUrl(searchValue);
  renderSearchResult(result);
  renderPlaylist(result);
};

const handlePlaylistClick = async (event, youtubePlayer) => {
  const $li = event.target.closest("li");
  const videoId = $li.dataset.id;
  if (!youtubePlayer.player) youtubePlayer.setPlayer();
  youtubePlayer.setVideoId(videoId);
};

export const initMusicPlayer = () => {
  const $searchForm = document.querySelector("#search-form");
  const $playlist = document.querySelector(".music-playlist");
  const youtubePlayer = new YoutubePlayer();
  youtubePlayer.loadIframeApi();

  $searchForm.addEventListener("submit", handleSearchSubmit);
  $playlist.addEventListener("click", event =>
    handlePlaylistClick(event, youtubePlayer)
  );
};
