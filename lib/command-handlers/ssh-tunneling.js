"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = handler;
function handler(argv) {
  process.stdout.write("ssh -R " + argv["remote-port"] + ":localhost:" + argv.port + " " + argv.host);
}