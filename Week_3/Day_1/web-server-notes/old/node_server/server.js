var http = require('http')
var fs = require('fs')

var server = http.createServer(function (request, response) {
  console.log(request.url, request.method)

  if (request.url === '/dogs') {
    if (request.method === 'GET') {
      response.setHeader('ice-cream', 'salted-caramel')
      response.setHeader('Content-Type', 'text/html')
      response.statusCode = 200
      // load the HTML file
      var dogsPage = fs.readFileSync('dogs.html')
      // send an HTML file
      response.end(dogsPage)
    } else {
      response.statusCode = 201
      response.setHeader('Content-Type', 'application/json')
      var newDog = {
        name: 'Spot',
        breed: 'Chihuahua'
      }

      response.end(JSON.stringify(newDog))
    }
  }  else {
    response.statusCode = 404
    response.end('NO, ONLY DOGS')
  }

  // send a response
})

server.listen(8080, function () {
  console.log('listening on port 8080')
  // http://localhost:8080
})