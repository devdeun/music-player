export const getSearchResultFromUrl = async url => {
  return await fetch(`/youtubeUrl?url=${url}`, {
    method: "GET",
  })
    .then(response => response.json())
    .catch(err => {
      console.log("getSearchResultFromUrl error: ", err);
      return false;
    });
};

export const getSearchResultFromKeyword = async keyword => {
  return await fetch(`/youtubeKeyword?keyword=${keyword}`, {
    method: "GET",
  })
    .then(response => response.json())
    .catch(err => {
      console.log("getSearchResultFromKeyword error: ", err);
      return false;
    });
};
