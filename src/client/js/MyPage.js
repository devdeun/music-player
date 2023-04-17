import { deleteSongFromDB } from "./utils/fetch";

export default class MyPage {
  constructor() {
    this.$deleteButtons = document.querySelectorAll(".song-delete-button");
  }

  async handleDeleteButtonClick(event) {
    event.preventDefault();
    const $button = event.target.closest("button");
    const { id } = $button.dataset;
    console.log(id);
    await deleteSongFromDB(id);
    $button.closest("li").remove();
  }

  init() {
    this.$deleteButtons.forEach($button => {
      $button.addEventListener(
        "click",
        this.handleDeleteButtonClick.bind(this)
      );
    });
  }
}
