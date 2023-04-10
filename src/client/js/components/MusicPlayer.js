export default class MusicPlayer {
  constructor() {
    this.$containerId = "video-player";
    this.id = "";
    this.player = null;
    this.playlist = [];
    this.playlistTitle = "MyPli";
    this.songInfo = "";
  }

  setPlayer(id) {
    if (this.player) this.player.destroy();
    this.player = new YT.Player(this.$containerId, {
      width: "100%",
      height: "100%",
      videoId: id,
      playerVars: {
        autoplay: 1,
      },
    });
    this.id = id;
  }

  setPlaylist(songInfo) {
    this.playlist.push(songInfo);
  }

  getPlaylist() {
    return this.playlist;
  }

  getPlayer() {
    return this.player;
  }

  getCurrentSongId() {
    return this.id;
  }

  renderInitPlaylistPlayer(
    playlistTitle = this.playlistTitle,
    songInfo = this.songInfo
  ) {
    const $playlistPlayer = document.querySelector(".my-playlist-player");
    const $title = $playlistPlayer.querySelector(".my-playlist-player-title");
    const $songInfo = $playlistPlayer.querySelector(
      ".my-playlist-player-song-info"
    );

    $title.innerText = playlistTitle;
    $songInfo.innerText = songInfo ? songInfo : "재생 중인 곡이 없습니다.";
  }

  updatePlaylistTitle(title) {
    this.playlistTitle = title;
    const $h2 = document.querySelector(".my-playlist-player-title");
    $h2.innerText = title;
  }

  updateCurrentSong(id, songInfo) {
    this.id = id;
    this.songInfo = songInfo;
    const $p = document.querySelector(".my-playlist-player-song-info");
    $p.innerText = songInfo;
    this.setPlayer(id);
  }

  pause() {
    this.player.pauseVideo();
  }

  play() {
    this.player.playVideo();
  }

  loadIframeApi() {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  init() {
    this.loadIframeApi();
    this.renderInitPlaylistPlayer();
  }
}
