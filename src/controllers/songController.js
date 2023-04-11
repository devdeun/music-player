// import Song from "../models/Song";
// import User from "../models/User";
import {
  fetchYoutubeInfoFromUrl,
  fetchYoutubeInfoFromKeyword,
} from "../models/Song";
import Chart, { getMelonChart } from "../models/Chart";
import { async } from "regenerator-runtime";

export const home = async (req, res) => {
  try {
    const charts = await Chart.find();
    const sortedCharts = charts.sort((a, b) => Number(a.rank) - Number(b.rank));
    return res.render("home", { pageTitle: "Home", charts: sortedCharts });
  } catch (err) {
    console.error(err);
  }
};

export const youtubeInfoFromUrl = async (req, res) => {
  try {
    const url = req.query.url;
    const info = await fetchYoutubeInfoFromUrl(url);
    res.json(info);
  } catch (err) {
    console.log(err);
    res.json(false);
  }
};

export const youtubeInfoFromKeyword = async (req, res) => {
  try {
    const keyword = req.query.keyword;
    const info = await fetchYoutubeInfoFromKeyword(encodeURIComponent(keyword));
    res.json(info);
  } catch (err) {
    console.log(err);
    res.json(false);
  }
};

export const melonChart = async (req, res) => {
  try {
    await getMelonChart();
    console.log("melonChart updated");
    return res.redirect("/");
  } catch (err) {
    console.error(err);
  }
};
