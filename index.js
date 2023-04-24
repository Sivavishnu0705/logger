const morgan = require('morgan');
const express = require('express'), bodyParser = require('body-parser');
const cors = require('cors');
const commandLineArgs = require('command-line-args');
const config = require('config');
const app = express()
const logger = require('./logger.js');

app.use(morgan('dev'));
app.use(bodyParser.json());


function localLog(req, res){
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

function colouredLog(req,res){
    const statusCode = res.statusCode;
if(statusCode >= 200 && statusCode<300){
    console.log('\x1b[32m%s\x1b[0m', 'Status Code :'+statusCode+', Method : '+req.method)
}else if(statusCode>=400){
    console.log('\x1b[31m%s\x1b[0m', 'Status Code :'+statusCode+', Method : '+req.method)
}else {
    console.log('\x1b[33m%s\x1b[0m', 'Status Code :'+statusCode+', Method : '+req.method)
}
}

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

  app.use((req, res, next) => {
    console.log('Time:', Date.now())
    logger.config({
        dest: {
            url: "https://host:port/path",
            headers: {
                "Content-Type": "etc",
            },
        },
        buffer: {
            logCount: 100,
        },
        logger: {
            trigger: true ,
            offsetMs: 5
        }
     });
    next()
  })

  app.get('/', (req, res) => {
    res.send('get')
    colouredLog(req,res);
    localLog(req,'get','get');
    logger.log('deug','get','message_1','msg_2');
  })
 
  app.put('/', (req, res) => {
    res.send('put')
    colouredLog(req,res);
    localLog(req,'put','put');
})

  app.post('/', (req, res) => {
    res.send('post '+req.body.test)
    colouredLog(req,res);
    localLog(req,'post '+req.body.test,'post');
})

  app.delete('/', (req, res) => {
    res.send('delete')
    colouredLog(req,res);
    localLog(req,'delete','delete');
})

  app.options('/', (req, res) => {
    res.send('options')
    colouredLog(req,res);
    localLog(req,'options','options');
})

  app.patch('/', (req, res) => {
    res.send('patch')
    colouredLog(req,res);
    localLog(req,'patch','patch');
})

  app.delete('/', (req, res) => {
    res.send('delete')
    colouredLog(req,res);
    localLog(req,'delete','delete');
})

  app.listen(config.get('server.port'), function () {
    console.log('app listening on port '+config.get('server.port'));
  });