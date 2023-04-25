const { Client, } = require('node-rest-client')

const client = new Client()
client.get('http://localhost:8080/', (data) => {
  console.log(`logger ${data}`)
})

const args = {
  data: { test: 'hello', },
  headers: { 'Content-Type': 'application/json', },
}

client.post('http://localhost:8080/', args, (data) => {
  console.log(`siva ${data}`)
})
