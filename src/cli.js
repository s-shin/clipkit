import yargs from "yargs";
import handlerForServer from "./command-handlers/server";
import handlerForSSHTunneling from "./command-handlers/ssh-tunneling";
import handlerForCopy from "./command-handlers/copy";

const DEFAULTS = {
  CLIPKIT_SERVER_PORT: 3000,
  CLIPKIT_SERVER_SECRET: "",
  CLIPKIT_SSH_TUNNELING_REMOTE_PORT: 50000,
};

function getDefault(name) {
  return process.env[name] || DEFAULTS[name];
}

yargs
  .usage("Usage: $0 <command> ...")
  .command(
    "server [options..]",
    "start clipkit server",
    {
      port: {
        alias: "p",
        type: "number",
        default: getDefault("CLIPKIT_SERVER_PORT"),
      },
      secret: {
        alias: "s",
        type: "string",
        default: getDefault("CLIPKIT_SERVER_SECRET"),
      },
    },
    handlerForServer
  )
  .command(
    "ssh-tunneling [options..] <host>",
    "ssh tunneling helper",
    {
      port: {
        alias: "p",
        type: "number",
        default: getDefault("CLIPKIT_SERVER_PORT"),
      },
      "remote-port": {
        alias: "r",
        type: "number",
        default: getDefault("CLIPKIT_SSH_TUNNELING_REMOTE_PORT"),
      },
    },
    handlerForSSHTunneling
  )
  .command(
    "copy [options..]",
    "copy piped data",
    {
      port: {
        alias: "p",
        type: "number",
        default: process.env.CLIPKIT_SSH_TUNNELING_REMOTE_PORT || getDefault("CLIPKIT_SERVER_PORT"),
      },
      secret: {
        alias: "s",
        type: "string",
        default: getDefault("CLIPKIT_SERVER_SECRET"),
      },
    },
    handlerForCopy
  )
  .help()
  .alias("help", "h")
  .argv;
