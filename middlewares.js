"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.localsMiddleware = void 0;

var localsMiddleware = function localsMiddleware(req, res, next) {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "XXXX";
  res.locals.loggedInUser = req.session.user || {};
  next();
};

exports.localsMiddleware = localsMiddleware;