import "../scss/styles.scss";
import { initMusicPlayer } from "./musicPlayer.js";

initMusicPlayer();

const handleChartRefreshButtonClick = async event => {
  event.preventDefault();
  const $btn = event.target;
  $btn.classList.add("loading");
  await fetch("/refreshChart");
  $btn.classList.remove("loading");
};

const init = () => {
  const $chartRefreshButton = document.querySelector(".top-100-refresh");
  $chartRefreshButton.addEventListener("click", handleChartRefreshButtonClick);
};

init();
