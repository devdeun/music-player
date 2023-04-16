export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "XXXX";
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.loggedInUser = req.session.user || {};
  next();
};
