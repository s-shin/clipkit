import http from "http";
import {SERVER} from "../constants";

export default function handler({port, secret}) {
  const req = http.request({
    port,
    method: "POST",
    path: SERVER.PATH_INFO,
    headers: {
      "Content-Type": "application/json",
    },
    auth: secret ? `${SERVER.AUTH_NAME}:${secret}` : null,
    agent: false, // do not use keep-alive (means exit on end of request)
  }, (res) => {
    if (res.statusCode !== 200) {
      process.exitCode = 1;
      res.pipe(process.stderr);
      res.on("end", () => process.stderr.write("\n"));
    }
  });
  req.on("error", (e) => {
    process.exitCode = 1;
    process.stderr.write(`ERROR: ${e.message}\n`);
  });
  process.stdin.pipe(req);
}
