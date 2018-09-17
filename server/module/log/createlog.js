/**
 * Configurations of logger.
 */
const winston = require('winston');
const winstonRotator = require('winston-daily-rotate-file');
var path = require('path');
LogPath = __dirname;
LogPath = (LogPath.substr(0, LogPath.length - 10));

const consoleConfig = [
  new winston.transports.Console({
    'colorize': true
  })
];

const createLogger = new winston.Logger({
  'transports': consoleConfig
});

const successLogger = createLogger;
successLogger.add(winstonRotator, {
  'name': 'access-%DATE%.log',
  'level': 'info',
  'filename': LogPath+'/logs/access-%DATE%.log',
  'json': false,
  'datePattern': 'Y-MM-DD',
  'prepend': true
});

const errorLogger = createLogger;
errorLogger.add(winstonRotator, {
  'name': 'error-%DATE%.log',
  'level': 'error',
  'filename': LogPath+'/logs/error-%DATE%.log',
  'json': false,
  'datePattern': 'Y-MM-DD',
  'prepend': true
});

module.exports = {
  'successlog': successLogger,
  'errorlog': errorLogger
};