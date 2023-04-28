const morgan = require('morgan')
const express = require('express')
const bodyParser = require('body-parser')
const config = require('config')

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.json())

app.use((err, req, res) => {
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
  res.send(`post ${req.body.test}`)
})

app.delete('/', (req, res) => {
  res.send('delete')
})

app.delete('/', (req, res) => {
  res.send('delete')
})

app.delete('/', (req, res) => {
  res.send('delete')
})

app.delete('/', (req, res) => {
  res.send('delete')
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

app.options('/', (req, res) => {
  res.send('options')
})

app.trace('/', (req, res) => {
  res.send('trace')
})

app.connect('/', (req, res) => {
  res.send('connect')
})

app.head('/', (req, res) => {
  res.send('head')
})

app.listen(config.get('server.port'), () => {
  console.log(`app listening on port ${config.get('server.port')}`)
})
