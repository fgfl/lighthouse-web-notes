var http = require('http')
var fs = require('fs')

var homePage = fs.readFileSync("./index.html")
var dogsPage = fs.readFileSync("./dogs.html")

var server = http.createServer(function(request, response) {
  console.log(request.method, request.url)

  if (request.method === 'GET') {
    if (request.url === '/') {
      response.statusCode = 200
      response.setHeader("Content-Type", "text/html")
      response.end(homePage)
    } else if (request.url === '/dogs') {
      response.statusCode = 200
      response.setHeader("Content-Type", "text/html")
      response.end(dogsPage)
    } else {
      response.statusCode = 200
      let returnObject = {
        hello: 'world',
        weather: 'cold'
      }
      response.setHeader('Content-Type', "application/json")
      response.setHeader('NimasHeader', "HahhaWhatUpYeeeezy")
      response.end(JSON.stringify(returnObject))
    }

  } else {
    response.statusCode = 418
    response.end('Other request!')
  }
})


server.listen(8080, function() {
  console.log('listening!')
})