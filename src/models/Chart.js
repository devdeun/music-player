import mongoose from "mongoose";
import cheerio from "cheerio";
import axios from "axios";

const chartSchema = new mongoose.Schema({
  rank: String,
  rankStatus: String,
  rankChange: String,
  title: String,
  artist: String,
  cover: String,
});
const Chart = mongoose.model("Chart", chartSchema);

const url = "https://www.melon.com/chart/index.htm";
(async () => {
  try {
    await Chart.deleteMany({}, err => {
      if (err) console.error("delete error", err);
    });
    const res = await axios.get(url);
    const $ = cheerio.load(res.data);
    $("tbody tr").each((index, element) => {
      const rankInfo = $(element).find(".rank_wrap > span").text();
      const chart = new Chart({
        rank: $(element).find(".rank").text(),
        rankStatus: rankInfo.slice(0, 5),
        rankChange: rankInfo.slice(5) || "0",
        title: $(element).find(".ellipsis.rank01").text().trim(),
        artist: $(element).find(".ellipsis.rank02 > a").text().trim(),
        cover: $(element).find(".image_typeAll img").attr("src"),
      });

      try {
        chart.save();
      } catch (err) {
        console.error("save error", err);
      }
    });
  } catch (err) {
    console.error(err);
  }
})();

module.exports = Chart;
