import { IFRAME_ID } from "../utils/constants";
import { resetSongPlayButton, setScreenSongInfo } from "../utils/domUtils";

export default class YoutubePlayer {
  constructor() {
    this.$containerId = IFRAME_ID;
    this.$audioPlayButton = document.querySelector(".audio-play-button");
    this.$playerRecord = document.querySelector(
      ".audio-controller-record-container"
    );
    this.player = null;
    this.currentId = null;
  }

  setPlayer(id) {
    this.player = new YT.Player(this.$containerId, {
      width: "100%",
      height: "100%",
      videoId: id,
      playerVars: {
        autoplay: 1,
      },
      events: {
        onStateChange: this.onPlayerStateChange.bind(this),
      },
    });
    this.id = id;
  }

  onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
      this.resetSongPlayButton();
      setScreenSongInfo();
    }
  }

  resetSongPlayButton() {
    this.$audioPlayButton.innerText = "play_arrow";
    resetSongPlayButton();
  }

  updateSong(id) {
    this.player.loadVideoById(id);
  }

  pause() {
    this.player.pauseVideo();
  }

  play(youtubdId, id) {
    if (!this.player) return this.setPlayer(youtubdId);
    if (this.currentId === id) return this.player.playVideo();
    this.currentId = id;
    this.updateSong(youtubdId);
  }

  updateRecordSpin() {
    this.$playerRecord.classList.toggle("spin");
  }

  loadIframeApi() {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  init() {
    this.loadIframeApi();
  }
}
