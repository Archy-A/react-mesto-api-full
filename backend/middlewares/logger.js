const winston = require('winston');
const expressWinston = require('express-winston');

const requestLogger = expressWinston.logger({
  transports: [
    // new winston.transports.File({ filename: '../texterrors/request.log' }),
    new winston.transports.File({ filename: '/home/art/react-mesto-api-full/backend/texterrors/request.log' }),
  ],
  format: winston.format.json(),
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    // new winston.transports.File({ filename: '../texterrors/error.log' }),
    new winston.transports.File({ filename: '/home/art/react-mesto-api-full/backend/texterrors/error.log' }),
  ],
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};
