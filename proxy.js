const morgan = require('morgan')
const express = require('express')
const bodyParser = require('body-parser')
const config = require('config')
const { Client, } = require('node-rest-client')
const localLogging = require('./LocalLogging')

const app = express()
const client = new Client()
app.use(morgan('dev'))
app.use(bodyParser.json())

function colouredLog(req, res) {
  const { statusCode, } = res
  if (statusCode >= 200 && statusCode < 300) {
    console.log('\x1b[32m%s\x1b[0m', `Status Code :${statusCode}, Method : ${req.method}`)
  } else if (statusCode >= 400) {
    console.log('\x1b[31m%s\x1b[0m', `Status Code :${statusCode}, Method : ${req.method}`)
  } else {
    console.log('\x1b[33m%s\x1b[0m', `Status Code :${statusCode}, Method : ${req.method}`)
  }
}

app.use((req, res, next) => {
  next()
})
app.get('/', (req, res) => {
  client.get(`${config.get('server.host')}:${config.get('server.port')}/`, (data) => {
    colouredLog(req, res)
    localLogging.log(req, data)
    res.send(data)
  })
})

app.post('/', (req, res) => {
  const args = {
    data: req.body,
    headers: { 'Content-Type': 'application/json', },
  }

  client.post(`${config.get('server.host')}:${config.get('server.port')}/`, args, (data) => {
    colouredLog(req, res)
    localLogging.log(req, data)
    res.send(data)
  })
})

app.delete('/', (req, res) => {
  client.delete(`${config.get('server.host')}:${config.get('server.port')}/`, (data) => {
    colouredLog(req, res)
    localLogging.log(req, data)
    res.send(data)
  })
})

app.patch('/', (req, res) => {
  client.patch(`${config.get('server.host')}:${config.get('server.port')}/`, (data) => {
    colouredLog(req, res)
    localLogging.log(req, data)
    res.send(data)
  })
})

app.delete('/', (req, res) => {
  client.delete(`${config.get('server.host')}:${config.get('server.port')}/`, (data) => {
    colouredLog(req, res)
    localLogging.log(req, data)
    res.send(data)
  })
})

app.options('/', (req, res) => {
  client.options(`${config.get('server.host')}:${config.get('server.port')}/`, (data) => {
    colouredLog(req, res)
    localLogging.log(req, data)
    res.send(data)
  })
})

app.listen(config.get('proxy.port'), () => {
  console.log(`app listening on port ${config.get('proxy.port')}`)
})
