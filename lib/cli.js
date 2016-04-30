"use strict";

var _yargs = require("yargs");

var _yargs2 = _interopRequireDefault(_yargs);

var _server = require("./command-handlers/server");

var _server2 = _interopRequireDefault(_server);

var _sshTunneling = require("./command-handlers/ssh-tunneling");

var _sshTunneling2 = _interopRequireDefault(_sshTunneling);

var _copy = require("./command-handlers/copy");

var _copy2 = _interopRequireDefault(_copy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULTS = {
  CLIPKIT_SERVER_PORT: 3000,
  CLIPKIT_SERVER_SECRET: "",
  CLIPKIT_SSH_TUNNELING_REMOTE_PORT: 50000
};

function getDefault(name) {
  return process.env[name] || DEFAULTS[name];
}

_yargs2.default.usage("Usage: $0 <command> ...").command("server [options..]", "start clipkit server", {
  port: {
    alias: "p",
    type: "number",
    default: getDefault("CLIPKIT_SERVER_PORT")
  },
  secret: {
    alias: "s",
    type: "string",
    default: getDefault("CLIPKIT_SERVER_SECRET")
  }
}, _server2.default).command("ssh-tunneling [options..] <host>", "ssh tunneling helper", {
  port: {
    alias: "p",
    type: "number",
    default: getDefault("CLIPKIT_SERVER_PORT")
  },
  "remote-port": {
    alias: "r",
    type: "number",
    default: getDefault("CLIPKIT_SSH_TUNNELING_REMOTE_PORT")
  }
}, _sshTunneling2.default).command("copy [options..]", "copy piped data", {
  port: {
    alias: "p",
    type: "number",
    default: process.env.CLIPKIT_SSH_TUNNELING_REMOTE_PORT || getDefault("CLIPKIT_SERVER_PORT")
  },
  secret: {
    alias: "s",
    type: "string",
    default: getDefault("CLIPKIT_SERVER_SECRET")
  }
}, _copy2.default).demand(1).strict().help().alias("help", "h").version().alias("version", "v").argv;