import "../scss/styles.scss";

const searchForm = document.querySelector("#search-form");
const searchResultList = document.querySelector(".search-result-list");

const getSearchResult = async searchValue => {
  return await fetch(`/search?keyword=${searchValue}`, {
    method: "GET",
  })
    .then(response => response.json())
    .catch(err => console.error(err));
};

searchForm.addEventListener("submit", async event => {
  event.preventDefault();
  const searchInput = document.querySelector(".search-input");
  const searchValue = searchInput.value;
  searchInput.value = "";
  const result = await getSearchResult(searchValue);

  searchResultList.innerHTML = "";
  result.forEach(song => {
    console.log(song);
    const li = document.createElement("li");
    const img = document.createElement("img");
    const link = document.createElement("a");
    li.innerHTML = `
    <img src="${song.image[1]["#text"]}" alt=""/>
    ${song.name} - ${song.artist}
    <a href="${song.url}" target="_blank">Listen</a>`;
    searchResultList.appendChild(li);
  });
});
