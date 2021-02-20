const winston = require('winston');
const infoLogger = winston.createLogger({
	transports: [new winston.transports.File({ filename: 'combined.log' })],
});
const errorLogger = winston.createLogger({
	transports: [
		new winston.transports.File({ filename: 'error.log', level: 'error' }),
	],
});
exports.createLog = (level, message) => {
	switch (level) {
		case 'error':
			errorLogger.log({
				level: level,
				message: message,
			});
		case 'info':
			infoLogger.log({
				level: level,
				message: message,
			});
			break;
		default:
			infoLogger.log({
				level: level,
				message: message,
			}); 
	}
};
