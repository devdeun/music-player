import Chart from "../models/Chart";

export const top100chart = async (req, res) => {
  try {
    const charts = await Chart.find();
    return res.render("top100", { pageTitle: "Top100", charts });
  } catch (err) {
    console.error(err);
  }
};
