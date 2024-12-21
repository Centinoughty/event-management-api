const { error } = require("console");
const fs = require("fs");
const path = require("path");

module.exports = (req, res, next) => {
  const logFile = path.join(__dirname, "../logs/session.log");
  const logEntry = `
  Time: ${new Date().toISOString()},
  IP: ${req.ip},
  Method: ${req.method},
  Endpoint: ${req.originalUrl},
  Headers: ${JSON.stringify(req.headers)},
  Body: ${JSON.stringify(req.body)}\n`;

  fs.appendFile(logFile, logEntry, (err) => {
    if (err) {
      console.log(error);
    }
  });
  
  next();
};
