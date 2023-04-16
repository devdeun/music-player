import User from "../models/User";

const setNewUser = async (userID, name, email) => {
  let user = await User.findOne({ userID });
  if (user) return user;
  return await User.create({
    userID,
    name,
    email,
  });
};

export const googleAuthCallback = async (req, res) => {
  if (!req.user) return res.redirect("/");
  const { id, displayName, emails } = req.user;
  console.log(id, displayName, emails);
  try {
    const user = await setNewUser(id, displayName, emails[0].value);
    req.session.user = user;
  } catch (error) {
    console.log("googleAuthCallback error: ", error);
    return req.logout(() => res.redirect("/"));
  }
  return res.redirect("/");
};

export const logout = (req, res, next) => {
  req.logout(error => {
    if (error) return next(error);
    req.session.user = null;
    res.redirect("/");
  });
};

export const userInfo = (req, res) => {
  return res.json(req.session.user);
};
