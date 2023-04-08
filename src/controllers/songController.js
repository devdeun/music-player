// import Song from "../models/Song";
// import User from "../models/User";
import { fetchYoutubeInfoFromUrl } from "../models/Song";
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

export const youtubeInfo = async (req, res) => {
  try {
    const url = req.query.url;
    const info = await fetchYoutubeInfoFromUrl(url);
    res.json(info);
  } catch (err) {
    console.error(err);
  }
};
