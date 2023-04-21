import { ALERT } from "../utils/constants";

export default class AudioController {
  constructor(YoutubePlayer, Playlist) {
    this.$playButton = document.querySelector(".audio-play-button");
    this.$nextButton = document.querySelector(".audio-skip-next-button");
    this.$prevButton = document.querySelector(".audio-skip-previous-button");
    this.YoutubePlayer = YoutubePlayer;
    this.Playlist = Playlist;
  }

  getSongInfo() {
    if (!this.Playlist.getPlaylist().length) return null;
    let songInfo = this.Playlist.getCurrentSongInfo();
    if (!songInfo) songInfo = this.Playlist.getPlaylist()[0];
    return songInfo;
  }

  togglePlaylistPlayPauseButton(id) {
    const $playlistButtons = document.querySelectorAll(
      ".playlist-song-play-button"
    );
    $playlistButtons.forEach($button => {
      if ($button.dataset.id !== id) $button.innerText = "play_arrow";
    });
    const $targetButton = Array.from($playlistButtons).find(
      button => button.dataset.id === id
    );
    $targetButton.innerText =
      this.Playlist.togglePlayPauseButton($targetButton);
  }

  togglePlayPauseButton(currentId) {
    this.togglePlaylistPlayPauseButton(currentId);
    if (this.$playButton.innerText === "play_arrow") {
      this.$playButton.innerText = "pause";
    }
  }

  handlePlayButtonClick(event) {
    event.preventDefault();
    const songInfo = this.getSongInfo();
    if (!songInfo) return alert(ALERT.NO_SONG_IN_PLAYLIST);
    const state = this.$playButton.innerText;
    state === "play_arrow"
      ? this.Playlist.play(songInfo)
      : this.YoutubePlayer.pause();
    this.$playButton.innerText = this.Playlist.togglePlayPauseButton(
      this.$playButton
    );

    this.togglePlaylistPlayPauseButton(songInfo.id);
    this.Playlist.toggleRecordSpin(this.$playButton);
  }
  handlePrevButtonClick(event) {
    event.preventDefault();
    const playlistLength = this.Playlist.getPlaylist().length;
    if (!playlistLength) return;
    this.Playlist.prevSongPlay();
    const currentId = this.Playlist.getCurrentSongInfo().id;
    if (playlistLength !== 1) {
      this.togglePlayPauseButton(currentId);
    }
  }

  handleNextButtonClick(event) {
    event.preventDefault();
    const playlistLength = this.Playlist.getPlaylist().length;
    if (!playlistLength) return;
    this.Playlist.nextSongPlay();
    const currentId = this.Playlist.getCurrentSongInfo().id;
    if (playlistLength !== 1) {
      this.togglePlayPauseButton(currentId);
    }
  }

  init() {
    this.$playButton.addEventListener(
      "click",
      this.handlePlayButtonClick.bind(this)
    );
    this.$nextButton.addEventListener(
      "click",
      this.handleNextButtonClick.bind(this)
    );
    this.$prevButton.addEventListener(
      "click",
      this.handlePrevButtonClick.bind(this)
    );
  }
}
