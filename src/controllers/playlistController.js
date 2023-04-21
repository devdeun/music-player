import User from "../models/User";

export const updatePlaylist = async (req, res) => {
  const song = req.body;
  if (!req.session.user) return res.status(401).json({ error: "unauthorized" });
  const { userID } = req.session.user;
  try {
    const user = await User.findOneAndUpdate(
      { userID },
      { $push: { playlist: song } },
      { new: true }
    );
    req.session.user = user;
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "update playlist error" });
  }
};

export const deleteSong = async (req, res) => {
  const { id } = req.body;
  const { userID } = req.session.user;
  try {
    const user = await User.findOneAndUpdate(
      { userID },
      { $pull: { playlist: { _id: id } } },
      { new: true }
    );
    req.session.user = user;
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "delete song error" });
  }
};
