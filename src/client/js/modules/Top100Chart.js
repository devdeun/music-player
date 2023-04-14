import { getSearchResultFromKeyword } from "../utils/fetch";
import { ALERT } from "../utils/constants";

export default class Top100Chart {
  constructor(Playlist) {
    this.$refreshButton = document.querySelector(".top-100-refresh");
    this.$songAddButtons = document.querySelectorAll(".top100-song-add-btn");
    this.Playlist = Playlist;
  }

  async handleRefreshButtonClick(event) {
    event.preventDefault();
    this.$refreshButton.classList.add("loading");
    await fetch("/refreshChart");
    location.reload();
  }

  async handleSongAddButtonClick(event) {
    event.preventDefault();
    const { title, artist } = event.target.closest("button").dataset;
    const { id, thumbnail } = await getSearchResultFromKeyword(
      `${title} ${artist}`
    );
    if (!id) return alert(ALERT.CAN_NOT_FIND_SONG);
    this.Playlist.addSong({ id, thumbnail, title, artist });
  }

  init() {
    this.$refreshButton.addEventListener(
      "click",
      this.handleRefreshButtonClick.bind(this)
    );
    this.$songAddButtons.forEach($button => {
      $button.addEventListener(
        "click",
        this.handleSongAddButtonClick.bind(this)
      );
    });
  }
}
