import { INIT_PLAYLIST_TITLE } from "../utils/constants";
import { resetSongPlayButton, setScreenSongInfo } from "../utils/domUtils";
import { addSongToDB, getUserPlaylist } from "../utils/fetch";
import { getPlaylistItem, getPlaylistItemButton } from "../utils/templates";

export default class Playlist {
  constructor(YoutubePlayer) {
    this.$playlist = document.querySelector(".music-playlist");
    this.$playlistTitle = document.querySelector(".my-playlist-player-title");
    this.YoutubePlayer = YoutubePlayer;
    this.title = INIT_PLAYLIST_TITLE;
    this.playlist = [];
    this.currentIndex = null;
  }

  async addSong(songInfo) {
    this.playlist.push(songInfo);
    await addSongToDB(songInfo);
    this.renderPlaylistItem(songInfo);
  }

  updatePlaylistTitle(title) {
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
    resetSongPlayButton(songInfo.id);
  }

  togglePlayPauseButton($button) {
    return $button.innerText === "pause" ? "play_arrow" : "pause";
  }

  play(songInfo, index) {
    const { id, title, artist } = songInfo;
    if (!index) {
      index = this.playlist.findIndex(song => song.id === id);
      this.currentIndex = index;
    }
    this.YoutubePlayer.play(id);
    setScreenSongInfo(`${title} - ${artist}`);
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

  init() {
    this.renderPlaylistTitle();
    this.renderInitialPlaylist();
    setScreenSongInfo();
  }
}
