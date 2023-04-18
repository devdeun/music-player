import { IFRAME_ID } from "../utils/constants";
import { resetSongPlayButton, setScreenSongInfo } from "../utils/domUtils";

export default class YoutubePlayer {
  constructor() {
    this.$containerId = IFRAME_ID;
    this.$audioPlayButton = document.querySelector(".audio-play-button");
    this.$playerRecord = document.querySelector(
      ".audio-controller-record-container"
    );
    this.$seekbarBackground = document.querySelector(".seekbar-background");
    this.$seekbarProgress = document.querySelector(".seekbar-progress");
    this.$seekbarInput = document.querySelector("#seekbar-input");
    this.player = null;
    this.currentId = null;
    this.seekbarInterver;
    this.duration;
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
        onReady: this.onPlayerReady.bind(this),
        onStateChange: this.onPlayerStateChange.bind(this),
      },
    });
    this.id = id;
  }

  onPlayerReady() {
    this.$seekbarBackground.addEventListener(
      "click",
      this.handleSeekbarClick.bind(this)
    );
    this.setSeekbar();
  }
  onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
      this.resetSongPlayButton();
      this.resetSeekbar();
      setScreenSongInfo();
    }
  }

  setSeekbar() {
    this.duration = this.player.getDuration();
    this.seekbarInterver = setInterval(this.updateSeekbar.bind(this), 500);
  }

  handleSeekbarClick(event) {
    event.preventDefault();
    const offset = event.offsetX;
    const width = this.$seekbarBackground.offsetWidth;
    const percentage = (offset / width) * 100;
    const seekTime = (this.duration * percentage) / 100;
    this.player.seekTo(seekTime);
  }

  updateSeekbar() {
    if (!this.duration) this.duration = this.player.getDuration();
    const currentTime = this.player.getCurrentTime();
    const percentage = Math.floor((currentTime / this.duration) * 100);
    this.$seekbarProgress.style.width = `${percentage}%`;
    this.$seekbarInput.value = currentTime;
  }
  resetSeekbar() {
    this.$seekbarProgress.style.width = 0;
    this.$seekbarInput.value = 0;
    clearInterval(this.seekbarInterver);
  }

  resetSongPlayButton() {
    this.$audioPlayButton.innerText = "play_arrow";
    resetSongPlayButton();
  }

  updateSong(id) {
    this.player.loadVideoById(id);
    this.setSeekbar();
  }

  pause() {
    this.player.pauseVideo();
  }

  play(youtubeId, id) {
    if (!this.player) {
      this.currentId = id;
      return this.setPlayer(youtubeId);
    }
    if (this.currentId === id) return this.player.playVideo();
    this.currentId = id;
    this.updateSong(youtubeId);
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
