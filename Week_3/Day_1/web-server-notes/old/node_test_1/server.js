var http = require('http')
var fs = require('fs')
var homePage = fs.readFileSync('index.html')
var dogPage = fs.readFileSync('dogs.html')

const port = 3000
const randomObject = {
  a: 1,
  b: 2,
  c: 3
}

function handleRequest (request, response) {
  if (request.url === '/' && request.method === 'GET') {
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html')
    response.end(homePage)
  } else if (request.url === '/dogs' && request.method === 'GET') {
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html')
    response.end(dogPage)
  } else if (request.url === '/someJSON' && request.method === 'POST') {
    response.statusCode = 200
    response.setHeader('Content-Type', 'application/json') // try commenting this line out
    response.end(JSON.stringify(randomObject))
  } else {
    response.statusCode = 200
    response.end('Other page')
  }
}

function bootUp () {
  console.log('Booted up!')
}

var server = http.createServer(handleRequest)

server.listen(port, bootUp)
