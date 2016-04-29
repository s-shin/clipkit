"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _winston = require("winston");

var _winston2 = _interopRequireDefault(_winston);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function formatTimestamp(timestamp) {
  return (0, _moment2.default)(timestamp).format("YYYY-MM-DD HH:mm:ss");
}

var logger = new _winston2.default.Logger({
  transports: [new _winston2.default.transports.Console({
    level: process.env.NODE_ENV === "development" ? "debug" : "info",
    colorize: true,
    timestamp: function timestamp() {
      return formatTimestamp(Date.now());
    }
  })]
});

exports.default = logger;