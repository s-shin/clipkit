import winston from "winston";
import moment from "moment";

function formatTimestamp(timestamp) {
  return moment(timestamp).format("YYYY-MM-DD HH:mm:ss");
}

const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      level: process.env.NODE_ENV === "development" ? "debug" : "info",
      colorize: true,
      timestamp() {
        return formatTimestamp(Date.now());
      },
    }),
  ],
});

export default logger;
