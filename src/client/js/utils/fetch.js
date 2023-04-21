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
      if (!data) return [];
      return data.playlist;
    })
    .catch(error => {
      console.log(error);
    });
};

export const addSongToDB = async song => {
  await fetch("/user/playlist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(song),
  }).catch(error => {
    console.log(error);
  });
};

export const deleteSongFromDB = async id => {
  await fetch("/user/playlist", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  }).catch(error => {
    console.log(error);
  });
};

export const updateUserInfo = async userInfo => {
  return await fetch("/user", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  })
    .then(response => response.json())
    .catch(error => console.log(error));
};
