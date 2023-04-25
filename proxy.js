const morgan = require('morgan');
const express = require('express'), bodyParser = require('body-parser');
const cors = require('cors');
const commandLineArgs = require('command-line-args');
const config = require('config');
const app = express()
const localLogging = require('./LocalLogging.js');
const logger = require('./logger.js');
const CircularJSON = require('circular-json');
const httpProxy = require('http-proxy');
const Client = require('node-rest-client').Client;
var client = new Client();
app.use(morgan('dev'));
app.use(bodyParser.json());

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

app.use((req, res, next) => {
    next()
  })
  app.get('/', (req, res) => {
    client.get(config.get('server.host')+':'+config.get('server.port')+'/', function (data, response) {
        colouredLog(req,res);
        localLogging.log(req,data);
        res.send(data)
    });  
})

app.post('/', (req, res) => {
    var args = {
        data: req.body,
        headers: { "Content-Type": "application/json" }
    };
    
    client.post(config.get('server.host')+':'+config.get('server.port')+'/', args, function (data, response) {
        colouredLog(req,res);
        localLogger.log(req,data);
       res.send(data)
    }); 
})

app.delete('/', (req, res) => {
    client.delete(config.get('server.host')+':'+config.get('server.port')+'/', function (data, response) {
        colouredLog(req,res);
        localLog(req,data);
       res.send(data)
    });  
})


app.patch('/', (req, res) => {
    client.patch(config.get('server.host')+':'+config.get('server.port')+'/', function (data, response) {
        colouredLog(req,res);
        localLogger.log(req,data);
       res.send(data)
    });  
})

app.delete('/', (req, res) => {
    client.delete(config.get('server.host')+':'+config.get('server.port')+'/', function (data, response) {
        colouredLog(req,res);
        localLogger.log(req,data);
       res.send(data)
    });  
})
 
  app.listen(config.get('proxy.port'), function () {
    console.log('app listening on port '+config.get('proxy.port'));
  });