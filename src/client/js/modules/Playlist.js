import {
  DEFAULT_PLAYLIST_IMAGE,
  INIT_PLAYLIST_TITLE,
} from "../utils/constants";
import { resetSongPlayButton, setScreenSongInfo } from "../utils/domUtils";
import { addSongToDB, getUserInfo, getUserPlaylist } from "../utils/fetch";
import { getPlaylistItem, getPlaylistItemButton } from "../utils/templates";

export default class Playlist {
  constructor(YoutubePlayer) {
    this.$playlist = document.querySelector(".music-playlist");
    this.$playlistTitle = document.querySelector(".my-playlist-player-title");
    this.$myPlaylist = document.querySelector(".my-playlist-player");
    this.$audioTitle = document.querySelector(".audio-controller-song-title");
    this.$audioArtists = document.querySelector(
      ".audio-controller-song-artists"
    );
    this.$audioNoSong = document.querySelector(".audio-controller-no-song");
    this.$audioRecordContainer = document.querySelector(
      ".audio-controller-record-container"
    );
    this.$audioWave = document.querySelector(".audiowave-container");
    this.$audioImage = document.querySelector(".record-song-thumbnail");
    this.$controllerPlayButton = document.querySelector(".audio-play-button");
    this.$fullscreenButton = document.querySelector(".fullscreen-button");
    this.$screen = document.querySelector(".music-player-section");
    this.YoutubePlayer = YoutubePlayer;
    this.title = "";
    this.playlist = [];
    this.currentIndex = null;
  }

  getCurrentSongInfo() {
    return this.playlist[this.currentIndex];
  }
  getPlaylist() {
    return this.playlist;
  }

  async addSong(songInfo) {
    this.playlist.push(songInfo);
    await addSongToDB(songInfo);
    this.renderPlaylistItem(songInfo);
  }

  updatePlaylistTitle(title) {
    if (!title) title = INIT_PLAYLIST_TITLE;
    this.title = title;
    this.renderPlaylistTitle();
  }

  handleSongPlayClick(event) {
    event.preventDefault();
    const $button = event.target;
    const songInfo = $button.dataset;
    const state = $button.innerText;
    state === "play_arrow" ? this.play(songInfo) : this.YoutubePlayer.pause();
    $button.innerText = this.togglePlayPauseButton($button);
    this.$controllerPlayButton.innerText = $button.innerText;
    this.toggleRecordSpin($button);
    this.toggleAudioWaveAnimation($button);
    resetSongPlayButton(songInfo.id);
  }

  togglePlayPauseButton($button) {
    return $button.innerText === "pause" ? "play_arrow" : "pause";
  }

  toggleRecordSpin($button) {
    if ($button.innerText === "pause")
      this.$audioRecordContainer.classList.add("spin");
    else this.$audioRecordContainer.classList.remove("spin");
  }

  toggleAudioWaveAnimation($button) {
    if (this.$audioWave.classList.contains("hide")) {
      this.$audioWave.classList.remove("hide");
    }
    if ($button.innerText === "pause") {
      this.$audioWave.classList.remove("stop");
    } else {
      this.$audioWave.classList.add("stop");
    }
  }

  updateAudioController(title, artist, thumbnail) {
    if (!this.$audioNoSong.classList.contains("hide")) {
      this.$audioNoSong.classList.add("hide");
    }
    this.$audioTitle.innerText = title;
    this.$audioArtists.innerText = artist;
    if (thumbnail) {
      this.$audioImage.style.backgroundImage = `url(${thumbnail})`;
    }
  }

  play(songInfo, index) {
    const { id, youtubeId, title, artist, thumbnail } = songInfo;
    if (!index) {
      index = this.playlist.findIndex(song => song.id === id);
      this.currentIndex = index;
    }
    this.YoutubePlayer.play(youtubeId, id);
    setScreenSongInfo(`${title} - ${artist}`);
    this.updateAudioController(title, artist, thumbnail);
  }
  prevSongPlay() {
    if (--this.currentIndex < 0) {
      this.currentIndex = this.playlist.length - 1;
    }
    const songInfo = this.playlist[this.currentIndex];
    this.play(songInfo, this.currentIndex);
  }
  nextSongPlay() {
    if (++this.currentIndex >= this.playlist.length) {
      this.currentIndex = 0;
    }
    const songInfo = this.playlist[this.currentIndex];
    this.play(songInfo, this.currentIndex);
  }

  renderPlaylistItem(songInfo) {
    const $li = getPlaylistItem(songInfo);
    const $button = getPlaylistItemButton(songInfo);
    $button.addEventListener("click", this.handleSongPlayClick.bind(this));
    $li.appendChild($button);
    this.$playlist.appendChild($li);
  }

  renderPlaylistTitle() {
    this.$playlistTitle.innerText = this.title;
  }

  async renderInitPlaylist() {
    const playlist = await getUserPlaylist();
    if (!playlist) return;
    this.playlist = playlist;
    playlist.forEach(song => this.renderPlaylistItem(song));
  }

  updatePlaylistImage(imageUrl) {
    this.$myPlaylist.style.backgroundImage = `url(${imageUrl})`;
  }

  async renderInitMyPlaylist() {
    let playlistTitle = "MyPli";
    let playlistImage = DEFAULT_PLAYLIST_IMAGE;
    const user = await getUserInfo();
    if (user) {
      playlistTitle = user.settings.playlistTitle;
      playlistImage = user.settings.playlistImage || DEFAULT_PLAYLIST_IMAGE;
    }
    this.updatePlaylistTitle(playlistTitle);
    this.updatePlaylistImage(playlistImage);
  }

  handleFullscreenClick(event) {
    event.preventDefault();
    const state = this.$fullscreenButton.innerText;
    state === "fullscreen"
      ? this.$screen.requestFullscreen()
      : document.exitFullscreen();
  }

  fullscreenToggle() {
    const state = this.$fullscreenButton.innerText;
    if (state === "fullscreen") {
      this.$fullscreenButton.innerText = "fullscreen_exit";
      this.$myPlaylist.classList.add("fullscreen");
    } else {
      this.$fullscreenButton.innerText = "fullscreen";
      this.$myPlaylist.classList.remove("fullscreen");
    }
  }

  init() {
    this.renderInitPlaylist();
    this.renderInitMyPlaylist();
    setScreenSongInfo();
    this.$fullscreenButton.addEventListener(
      "click",
      this.handleFullscreenClick.bind(this)
    );
    document.addEventListener(
      "fullscreenchange",
      this.fullscreenToggle.bind(this)
    );
  }
}
