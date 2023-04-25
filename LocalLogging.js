const config = require('config');
class LocalLogging {
   mInstance;

    constructor() { }

    static getInstance() {
        if (this._instance) {
            return this._instance;
        }

        this._instance = new LocalLogging();
        return this._instance;
    }

  log(req, res){
    const winston = require('winston');
    require('winston-daily-rotate-file');
    
    const { combine, timestamp, json } = winston.format;
    
    const fileRotateTransport = new winston.transports.DailyRotateFile({
      filename: './logs/%DATE%_'+Date.now()+'_'+req.method+'.js',
      datePattern: 'YYYY-MM-DD',
      maxFiles: config.get('server.rotating_logs_expiry'),
    });
    
    const logger = winston.createLogger({
      level: process.env.LOG_LEVEL || 'info',
      format: combine(timestamp(), json()),
      transports: [fileRotateTransport],
    });
    logger.info('Request : '+JSON.stringify(req.body)+', Response : '+res);

  }
}
module.exports = LocalLogging.getInstance();