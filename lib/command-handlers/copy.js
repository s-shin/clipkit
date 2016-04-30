"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = handler;

var _http = require("http");

var _http2 = _interopRequireDefault(_http);

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function handler(_ref) {
  var port = _ref.port;
  var secret = _ref.secret;

  var req = _http2.default.request({
    port: port,
    method: "POST",
    path: _constants.SERVER.PATH_INFO,
    headers: {
      "Content-Type": "application/json"
    },
    auth: secret ? _constants.SERVER.AUTH_NAME + ":" + secret : null,
    agent: false }, // do not use keep-alive (means exit on end of request)
  function (res) {
    if (res.statusCode !== 200) {
      process.exitCode = 1;
      res.pipe(process.stderr);
      res.on("end", function () {
        return process.stderr.write("\n");
      });
    }
  });
  req.on("error", function (e) {
    process.exitCode = 1;
    process.stderr.write("ERROR: " + e.message + "\n");
  });
  process.stdin.pipe(req);
}