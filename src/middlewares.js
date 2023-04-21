export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "MyPli";
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.loggedInUser = req.session.user || {};
  next();
};
