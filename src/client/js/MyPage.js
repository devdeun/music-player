import { ALERT, DEFAULT_PLAYLIST_IMAGE } from "./utils/constants";
import { deleteSongFromDB, updateUserInfo } from "./utils/fetch";

export default class MyPage {
  constructor() {
    this.$deleteButtons = document.querySelectorAll(".song-delete-button");
    this.$form = document.querySelector(".user-setting-form");
    this.$nameInput = document.querySelector("#user-info-name-input");
    this.$playlistTitleInput = document.querySelector("#player-title-input");
    this.$imageInput = document.querySelector("#player-image-input");
    this.$playlistImage = document.querySelector(".my-playlist-image");
  }

  async handleDeleteButtonClick(event) {
    event.preventDefault();
    const $button = event.target.closest("button");
    const { id } = $button.dataset;
    await deleteSongFromDB(id);
    $button.closest("li").remove();
  }

  isValidImageURL(url) {
    const extension = url.split(".").pop().toLowerCase();
    if (url.includes("images.unsplash.com/photo")) return true;
    return ["png", "jpeg", "jpg"].includes(extension);
  }

  isValidName(name) {
    if (!name) {
      alert(ALERT.NO_NAME);
      return false;
    }
    return true;
  }

  isValidPlaylistTitle(playlistTitle) {
    if (!playlistTitle) {
      alert(ALERT.NO_PLAYLIST_TITLE);
      return false;
    }
    return true;
  }

  isValidatedForm(name, playlistTitle, playlistImage) {
    if (!this.isValidName(name)) return false;
    if (!this.isValidPlaylistTitle(playlistTitle)) return false;
    if (playlistImage && !this.isValidImageURL(playlistImage)) {
      alert(ALERT.INVALID_IMAGE_URL);
      return false;
    }
    return true;
  }

  setPlaylistImage(url) {
    const imageUrl = url || DEFAULT_PLAYLIST_IMAGE;
    this.$playlistImage.style.backgroundImage = `url(${imageUrl})`;
  }

  async handleSubmitForm(event) {
    event.preventDefault();
    const name = this.$nameInput.value;
    const playlistTitle = this.$playlistTitleInput.value;
    const playlistImage = this.$imageInput.value;
    if (!this.isValidatedForm(name, playlistTitle, playlistImage)) return;

    const data = {
      name,
      settings: { playlistTitle, playlistImage },
    };
    const { playlistImage: newImageURL } = await updateUserInfo(data);
    this.setPlaylistImage(newImageURL);
    alert(ALERT.UPDATE_USER_INFO_SUCCESS);
  }

  init() {
    this.setPlaylistImage(this.$imageInput.value);
    this.$deleteButtons.forEach($button => {
      $button.addEventListener(
        "click",
        this.handleDeleteButtonClick.bind(this)
      );
    });
    this.$form.addEventListener("submit", this.handleSubmitForm.bind(this));
  }
}
