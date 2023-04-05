"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _cheerio = _interopRequireDefault(require("cheerio"));

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var chartSchema = new _mongoose["default"].Schema({
  rank: String,
  rankStatus: String,
  rankChange: String,
  title: String,
  artists: Array,
  cover: String
});

var Chart = _mongoose["default"].model("Chart", chartSchema);

var url = "https://www.melon.com/chart/index.htm";

_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  var res, $;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return Chart.deleteMany({}, function (err) {
            if (err) console.error("delete error", err);
          });

        case 3:
          _context.next = 5;
          return _axios["default"].get(url);

        case 5:
          res = _context.sent;
          $ = _cheerio["default"].load(res.data);
          $("tbody tr").each(function (index, element) {
            var rankInfo = $(element).find(".rank_wrap > span").text();
            var chart = new Chart({
              rank: $(element).find(".rank").text(),
              rankStatus: rankInfo.slice(0, 5),
              rankChange: rankInfo.slice(5) || "0",
              title: $(element).find(".ellipsis.rank01").text().trim(),
              artists: $(element).find(".ellipsis.rank02 > a").map(function () {
                return $(this).text().trim();
              }).get(),
              cover: $(element).find(".image_typeAll img").attr("src")
            });

            try {
              chart.save();
            } catch (err) {
              console.error("save error", err);
            }
          });
          _context.next = 13;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, null, [[0, 10]]);
}))();

module.exports = Chart;