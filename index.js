const morgan = require('morgan')
const express = require('express'), bodyParser = require('body-parser')
const cors = require('cors')
const commandLineArgs = require('command-line-args')
const config = require('config')
const app = express()
const logger = require('./logger.js')
const CircularJSON = require('circular-json')


app.use(morgan('dev'))
app.use(bodyParser.json())

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

  app.use((req, res, next) => {
     next()
  })

  app.get('/', (req, res) => {
    res.send('get')
  })
 
  app.put('/', (req, res) => {
    res.send('put')
  })

  app.post('/', (req, res) => {
    res.send('post '+req.body.test)
  })

  app.delete('/', (req, res) => {
    res.send('delete')
})

  app.patch('/', (req, res) => {
    res.send('patch')
})

  app.delete('/', (req, res) => {
    res.send('delete')
})

  app.listen(config.get('server.port'), function () {
    console.log('app listening on port '+config.get('server.port'))
  })