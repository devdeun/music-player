import "../scss/styles.scss";
import { initMusicPlayer, renderPlaylist } from "./musicPlayer.js";

initMusicPlayer();

const getSearchResultFromKeyword = async keyword => {
  return await fetch(`/youtubeKeyword?keyword=${keyword}`, {
    method: "GET",
  })
    .then(response => response.json())
    .catch(err => {
      return false;
    });
};

const handleChartRefreshButtonClick = async event => {
  event.preventDefault();
  const $btn = event.target;
  $btn.classList.add("loading");
  await fetch("/refreshChart");
  $btn.classList.remove("loading");
};

const handleSongAddButtonClick = async event => {
  event.preventDefault();
  const title = event.target.closest("button").dataset.title;
  const artist = event.target.closest("button").dataset.artist;
  const keyword = `${title} ${artist}`;
  const songInfo = await getSearchResultFromKeyword(keyword);
  if (!songInfo) {
    alert("죄송합니다. 곡을 찾을 수 없습니다.");
    return;
  }
  const { id, thumbnail } = songInfo;
  renderPlaylist({ id, title, artist, thumbnail });
};

const init = () => {
  const $chartRefreshButton = document.querySelector(".top-100-refresh");
  const $songAddButtons = document.querySelectorAll(".top100-song-add-btn");
  $chartRefreshButton.addEventListener("click", handleChartRefreshButtonClick);
  $songAddButtons.forEach($button => {
    $button.addEventListener("click", handleSongAddButtonClick);
  });
};

init();
