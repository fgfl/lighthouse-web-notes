var http = require('http')
var fs = require('fs')

var server = http.createServer(function (request, response) {
  // console.log(request) -- METHOD (e.g. POST, GET), URL ('/', '/dogs'), HEADERS, PARAMETERS

  console.log(request.method)

  if (request.method === 'GET') {
    if (request.url === '/') {
      console.log('REQUEST TO ROOT')
      response.statusCode = 200
      response.end('ROOT')
    } else if (request.url === '/dogs') {
      response.statusCode = 200
      var dogsPage = fs.readFileSync('dogs.html')
      response.setHeader("Content-Type", "text/html")
      response.end(dogsPage)
    } else {
      response.statusCode = 200
      response.setHeader("Content-Type", "application/json")
      response.end(JSON.stringify({
        name: 'Kanye',
        music: 'The Best'
      }))
    }
  } else {
    response.statusCode = 418
    response.end("I AM A TEAPOT!")
  }

})

var port = 1337
server.listen(1337, function () {
  console.log('I AM LISTENING ON 1337')
})


