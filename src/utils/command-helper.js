import path from "path";

export function makeCommandName(filename) {
  return path.parse(filename).name;
}

export function makeCommand(filename, optionsAndArguments) {
  return `${path.parse(filename).name} ${optionsAndArguments}`;
}
