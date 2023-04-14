import { ALERT } from "./constants";

export const hidePlaylistEmptyMessage = () => {
  const $emptyMessage = document.querySelector(".playlist-empty-message");
  if (!$emptyMessage.classList.contains("hide")) {
    $emptyMessage.classList.add("hide");
  }
};

export const setScreenSongInfo = screenSongInfo => {
  const $currentSongInfo = document.querySelector(
    ".my-playlist-player-song-info"
  );
  $currentSongInfo.innerText = screenSongInfo
    ? screenSongInfo
    : ALERT.NO_CURRENT_SONG;
};

export const resetSongPlayButton = id => {
  const $songPlayButtons = document.querySelectorAll(
    ".playlist-song-play-button"
  );
  $songPlayButtons.forEach($button => {
    if ($button.dataset.id !== id) $button.innerText = "play_arrow";
  });
};
