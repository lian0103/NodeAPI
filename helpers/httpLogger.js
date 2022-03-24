const morgan = require('morgan');
const json = require('morgan-json');
const format = json({
  method: ':method',
  url: ':url',
  status: ':status',
  contentLength: ':res[content-length]',
  responseTime: ':response-time',
});

const { logger } = require('./logger');
const httpLogger = morgan(format, {
  stream: {
    write: (message) => {
      const { method, url, status, responseTime } = JSON.parse(message);

      switch (Number(status)) {
        case 500: {
          logger.error('HTTP Access Log', {
            timestamp: new Date().toString(),
            method,
            url,
            status: Number(status),
            responseTime: Number(responseTime),
          });
          break;
        }
        default: {
          logger.info('HTTP Access Log', {
            timestamp: new Date().toString(),
            method,
            url,
            status: Number(status),
            responseTime: Number(responseTime),
          });
        }
      }
    },
  },
});

exports.httpLogger = httpLogger;
