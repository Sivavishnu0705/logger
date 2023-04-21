const morgan = require('morgan');
const express = require('express'), bodyParser = require('body-parser');
const cors = require('cors');
const commandLineArgs = require('command-line-args');
const config = require('config');
const app = express()

app.use(morgan('dev'));
app.use(bodyParser.json());


function localLog(req, res,method){
    const winston = require('winston');
    require('winston-daily-rotate-file');
    
    const { combine, timestamp, json } = winston.format;
    
    const fileRotateTransport = new winston.transports.DailyRotateFile({
      filename: './logs/%DATE%_'+Date.now()+'_'+method+'.js',
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

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

  app.use((req, res, next) => {
    console.log('Time:', Date.now())

    next()
  })

  app.get('/', (req, res) => {
    res.send('get')
    localLog(req,'get','get');
  })
 
  app.put('/', (req, res) => {
    res.send('put')
    localLog(req,'put','put');
})

  app.post('/', (req, res) => {
    res.send('post '+req.body.test)
    localLog(req,'post '+req.body.test,'post');
})

  app.delete('/', (req, res) => {
    res.send('delete')
    localLog(req,'delete','delete');
})

  app.options('/', (req, res) => {
    res.send('options')
    localLog(req,'options','options');
})

  app.patch('/', (req, res) => {
    res.send('patch')
    localLog(req,'patch','patch');
})

  app.delete('/', (req, res) => {
    res.send('delete')
    localLog(req,'delete','delete');
})

  app.listen(config.get('server.port'), function () {
    console.log('app listening on port '+config.get('server.port'));
  });