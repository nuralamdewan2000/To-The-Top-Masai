const { createLogger, transports, format } = require('winston');
const { combine, timestamp, prettyPrint } = format;
require('winston-mongodb');
require('dotenv').config();

const logger = createLogger({
  level: 'error',
  format: combine(timestamp(), prettyPrint()),
  transports: [
    new transports.File({ filename: 'logs/error.log' }),
    new transports.MongoDB({
      db: process.env.mongoUrl,
      options: { useUnifiedTopology: true },
      collection: 'error_logs',
    }),
  ],
});

module.exports = {
    logger
}