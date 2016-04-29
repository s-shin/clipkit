"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

exports.default = handler;

var _http = require("http");

var _http2 = _interopRequireDefault(_http);

var _url = require("url");

var _url2 = _interopRequireDefault(_url);

var _basicAuth = require("basic-auth");

var _basicAuth2 = _interopRequireDefault(_basicAuth);

var _copyPaste = require("copy-paste");

var _copyPaste2 = _interopRequireDefault(_copyPaste);

var _logger = require("../logger");

var _logger2 = _interopRequireDefault(_logger);

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeSimpleJsonResponse(res, status) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end((0, _stringify2.default)({ message: _http2.default.STATUS_CODES[status] }));
}

function handler(_ref) {
  var port = _ref.port;
  var secret = _ref.secret;

  _http2.default.createServer(function (req, res) {
    _logger2.default.info(req.method + " " + req.url);
    if (secret) {
      var credentials = (0, _basicAuth2.default)(req);
      if (!credentials || credentials.name !== _constants.SERVER.AUTH_NAME && credentials.pass !== secret) {
        return makeSimpleJsonResponse(res, 401);
      }
    }
    var urlComponents = _url2.default.parse(req.url);
    if (req.method !== "POST" || urlComponents.pathname !== _constants.SERVER.PATH_INFO) {
      return makeSimpleJsonResponse(res, 400);
    }
    var buf = [];
    req.on("data", buf.push.bind(buf));
    req.on("end", function () {
      var str = buf.join("");
      _copyPaste2.default.copy(str, function () {
        _logger2.default.info(str.length + " bytes of data was copied to clipborad.");
        makeSimpleJsonResponse(res, 200);
      });
    });
  }).listen(port);
  _logger2.default.info("Server started by listening to port " + port);
}