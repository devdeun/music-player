const getSearchResultFromUrl = async searchValue => {
  return await fetch(`/youtubeUrl?url=${searchValue}`, {
    method: "GET",
  })
    .then(response => response.json())
    .catch(err => console.error(err));
};

const renderSearchResult = (title, channelTitle, thumbnail) => {
  const $searchResult = document.querySelector(".search-result");
  $searchResult.innerHTML = `
    <h3>${title} by ${channelTitle}</h3>
    <img src="${thumbnail}" alt="" />
  `;
};

const handleSearchSubmit = async event => {
  event.preventDefault();
  const $searchInput = document.querySelector(".search-input");
  const searchValue = $searchInput.value;
  $searchInput.value = "";
  const { title, channelTitle, thumbnail } = await getSearchResultFromUrl(
    searchValue
  );
  renderSearchResult(title, channelTitle, thumbnail);
};

export const initMusicPlayer = () => {
  const $searchForm = document.querySelector("#search-form");
  $searchForm.addEventListener("submit", handleSearchSubmit);
};
