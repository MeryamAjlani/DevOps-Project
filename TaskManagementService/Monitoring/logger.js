var winston = require('winston'),
    expressWinston = require('express-winston');


export const logger = winston.createLogger({
    level: 'info',
    exitOnError: false,
    format: winston.format.combine(
        format.timestamp(),
        format.json(),
    ),
    transports: [
      new winston.transports.File({ filename: `./logs/data.log` }),
      new winston.transports.Console(),
    ],
});