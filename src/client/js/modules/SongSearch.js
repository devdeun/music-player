import { ALERT } from "../utils/constants";
import { getSearchResultFromUrl } from "../utils/fetch";

export default class SongSearch {
  constructor(Playlist) {
    this.$searchForm = document.querySelector("#search-form");
    this.$searchResultForm = document.querySelector("#search-result-form");
    this.$searchInput = document.querySelector(".search-input");
    this.$thumbnail = document.querySelector(".search-result-img");
    this.$titleInput = document.querySelector(".search-title-input");
    this.$channelTitleInput = document.querySelector(".search-artist-input");
    this.$cancelButton = document.querySelector(".search-result-cancel-button");
    this.Playlist = Playlist;
  }

  renderSearchResult({ id, title, channelTitle, thumbnail }) {
    this.$thumbnail.src = thumbnail;
    this.$titleInput.value = title;
    this.$titleInput.dataset.id = id;
    this.$channelTitleInput.value = channelTitle;
  }

  async handleSearchSubmit(event) {
    event.preventDefault();
    const searchValue = this.$searchInput.value;
    this.$searchInput.value = "";
    const result = await getSearchResultFromUrl(searchValue);
    if (!result) return alert(ALERT.CAN_NOT_FIND_SEARCH_RESULT);
    this.renderSearchResult(result);
    this.$searchResultForm.classList.add("open");
  }

  handleAddSongClick(event) {
    event.preventDefault();
    this.$searchResultForm.classList.remove("open");
    const songInfo = {
      id: this.$titleInput.dataset.id,
      title: this.$titleInput.value,
      artist: this.$channelTitleInput.value,
      thumbnail: this.$thumbnail.src,
    };
    this.Playlist.addSong(songInfo);
  }

  handleSearchResultCancel(event) {
    event.preventDefault();
    this.$searchResultForm.classList.remove("open");
    this.$searchResultForm.reset();
  }

  init() {
    this.$searchForm.addEventListener(
      "submit",
      this.handleSearchSubmit.bind(this)
    );
    this.$searchResultForm.addEventListener(
      "submit",
      this.handleAddSongClick.bind(this)
    );
    this.$cancelButton.addEventListener(
      "click",
      this.handleSearchResultCancel.bind(this)
    );
  }
}
