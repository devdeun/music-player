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
  }

  init() {
    this.Playlist = new Playlist(this.YoutubePlayer);
    this.SearchSong = new SongSearch(this.Playlist);
    this.Top100Chart = new Top100Chart(this.Playlist);
    this.YoutubePlayer.init();
    this.Playlist.init();
    this.SearchSong.init();
    this.Top100Chart.init();
  }
}
