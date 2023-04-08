export default class YoutubePlayer {
  constructor() {
    this.$containerId = "video-player";
    this.id = "";
    this.player = null;
  }

  setPlayer(id) {
    if (this.player) this.player.destroy();
    this.player = new YT.Player(this.$containerId, {
      width: "640",
      height: "360",
      videoId: id,
      playerVars: {
        autoplay: 1,
      },
    });
  }

  setVideoId(videoId) {
    this.id = videoId;
    this.setPlayer(videoId);
  }

  getPlayer() {
    return this.player;
  }

  loadIframeApi() {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }
}
