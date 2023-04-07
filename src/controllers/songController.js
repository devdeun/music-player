// import Song from "../models/Song";
// import User from "../models/User";
import { searchSongFromAPI } from "../models/Song";
import Chart from "../models/Chart";

export const home = async (req, res) => {
  try {
    const charts = await Chart.find();
    const sortedCharts = charts.sort((a, b) => Number(a.rank) - Number(b.rank));
    return res.render("home", { pageTitle: "Home", charts: sortedCharts });
  } catch (err) {
    console.error(err);
  }
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
