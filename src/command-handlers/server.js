import http from "http";
import url from "url";
import auth from "basic-auth";
import ncp from "copy-paste";
import logger from "../logger";
import {SERVER} from "../constants";

function makeSimpleJsonResponse(res, status) {
  res.writeHead(status, {"Content-Type": "application/json"});
  res.end(JSON.stringify({message: http.STATUS_CODES[status]}));
}

export default function handler({port, secret}) {
  http
    .createServer((req, res) => {
      logger.info(`${req.method} ${req.url}`);
      if (secret) {
        const credentials = auth(req);
        if (!credentials || credentials.name !== SERVER.AUTH_NAME && credentials.pass !== secret) {
          return makeSimpleJsonResponse(res, 401);
        }
      }
      const urlComponents = url.parse(req.url);
      if (req.method !== "POST" || urlComponents.pathname !== SERVER.PATH_INFO) {
        return makeSimpleJsonResponse(res, 400);
      }
      const buf = [];
      req.on("data", buf.push.bind(buf));
      req.on("end", () => {
        const str = buf.join("");
        ncp.copy(str, () => {
          logger.info(`${str.length} bytes of data was copied to clipborad.`);
          makeSimpleJsonResponse(res, 200);
        });
      });
    })
    .listen(port);
  logger.info(`Server started by listening to port ${port}`);
}
