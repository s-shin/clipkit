"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeCommandName = makeCommandName;
exports.makeCommand = makeCommand;

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeCommandName(filename) {
  return _path2.default.parse(filename).name;
}

function makeCommand(filename, optionsAndArguments) {
  return _path2.default.parse(filename).name + " " + optionsAndArguments;
}