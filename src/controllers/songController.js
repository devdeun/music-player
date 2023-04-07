// import Song from "../models/Song";
// import User from "../models/User";
import { searchSongFromAPI } from "../models/Song";

export const home = async (req, res) => {
  return res.render("home", { pageTitle: "Home" });
};

export const searchResult = async (req, res) => {
  try {
    const keyword = req.query.keyword;
    const searchResults = await searchSongFromAPI(encodeURIComponent(keyword));
    res.json(searchResults);
  } catch (err) {
    console.error(err);
  }
};
