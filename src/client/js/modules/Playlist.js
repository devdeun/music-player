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
    this.$audioImage = document.querySelector(".record-song-thumbnail");
    this.$controllerPlayButton = document.querySelector(".audio-play-button");
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
    resetSongPlayButton(songInfo.id);
  }

  togglePlayPauseButton($button) {
    return $button.innerText === "pause" ? "play_arrow" : "pause";
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

  async renderInitialPlaylist() {
    const playlist = await getUserPlaylist();
    if (playlist.length) {
      playlist.forEach(song => this.renderPlaylistItem(song));
    }
    this.playlist = playlist;
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
      playlistImage = user.settings.playlistImage;
    }
    this.updatePlaylistTitle(playlistTitle);
    this.updatePlaylistImage(playlistImage);
  }

  init() {
    this.renderInitialPlaylist();
    this.renderInitMyPlaylist();
    setScreenSongInfo();
  }
}
