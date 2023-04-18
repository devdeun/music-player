import AudioController from "./modules/AudioController";
import Playlist from "./modules/Playlist";
import SongSearch from "./modules/SongSearch";
import Top100Chart from "./modules/Top100Chart";
import YoutubePlayer from "./modules/YoutubePlayer";

export default class MyPli {
  constructor() {
    this.YoutubePlayer = new YoutubePlayer();
    this.Playlist = null;
    this.SearchSong = null;
    this.Top100Chart = null;
    this.AudioController = null;
  }

  init() {
    this.Playlist = new Playlist(this.YoutubePlayer);
    this.SearchSong = new SongSearch(this.Playlist);
    this.Top100Chart = new Top100Chart(this.Playlist);
    this.AudioController = new AudioController(
      this.YoutubePlayer,
      this.Playlist
    );
    this.YoutubePlayer.init();
    this.Playlist.init();
    this.SearchSong.init();
    this.Top100Chart.init();
    this.AudioController.init();
  }
}
