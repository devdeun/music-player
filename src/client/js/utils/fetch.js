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

export const getUserInfo = async () => {
  return await fetch("/user")
    .then(res => res.json())
    .then(data => {
      return data;
    })
    .catch(error => {
      console.log(error);
    });
};

export const getUserPlaylist = async () => {
  return await fetch("/user")
    .then(res => res.json())
    .then(data => {
      return data.playlist;
    })
    .catch(error => {
      console.log(error);
    });
};

export const addSongToDB = async song => {
  await fetch("user/playlist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(song),
  }).catch(error => {
    console.log(error);
  });
};
