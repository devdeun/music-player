import Chart from "../models/Chart";

export const top100chart = async (req, res) => {
  try {
    const charts = await Chart.find();
    const sortedCharts = charts.sort((a, b) => Number(a.rank) - Number(b.rank));
    return res.render("top100", { pageTitle: "Top100", charts: sortedCharts });
  } catch (err) {
    console.error(err);
  }
};
