var http = require('http')
var fs = require('fs')
var PORT = 8080

var kanyePage = fs.readFileSync('kanyePage.html')

// make server
var server = http.createServer(function (request, response) {
  console.log(request.method, request.url, request.headers)

  if (request.url === '/kanye') {
    if (request.method === 'GET') {
      response.setHeader('Content-Type', 'text/html')
      response.statusCode = 200
      response.end(kanyePage)
    } else {
      response.statusCode = 401
      response.end('NO! YOU CANNOT')
    }
  } else {
    response.setHeader('Content-Type', 'application/json')
    response.statusCode = 404
    var jsonString = JSON.stringify({
      message: 'Why would you want to see any other page?'
    })    
    response.end(jsonString)
  }

})

// start listening for requests
server.listen(PORT, function () {
  console.log('I AM LISTENING ON ' + PORT)
})


// when you get a request, send back "Cool!"