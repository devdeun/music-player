"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _chartController = require("../controllers/chartController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var chartRouter = _express["default"].Router();

chartRouter.get("/", _chartController.top100chart);
var _default = chartRouter;
exports["default"] = _default;