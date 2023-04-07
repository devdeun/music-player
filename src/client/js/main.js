import axios from "axios";
import "../scss/styles.scss";

const searchForm = document.querySelector("#search-form");
const searchResultList = document.querySelector(".search-result-list");

const getSearchResult = async searchValue => {
  return axios
    .get("/search", {
      params: { keyword: searchValue },
    })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.error(err);
    });
};

searchForm.addEventListener("submit", async event => {
  event.preventDefault();
  const searchInput = document.querySelector(".search-input");
  const searchValue = searchInput.value;
  searchInput.value = "";
  const result = await getSearchResult(searchValue);

  searchResultList.innerHTML = "";
  console.log("result", result);
  result.forEach(song => {
    console.log(song);
    const li = document.createElement("li");
    const img = document.createElement("img");
    const link = document.createElement("a");
    li.innerHTML = `
    <img src="${song.image[1]["#text"]}" alt=""/>
    ${song.name} - ${song.artist}
    <a href="${song.url}" target="_blank">Listen</a>
    `;

    searchResultList.appendChild(li);
  });
});
