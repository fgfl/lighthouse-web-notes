// access the http library
let http = require('http')
let fs = require('fs')

let kanyePage = fs.readFileSync('kanye.html')

let server = http.createServer(function (request, response) {
  const method = request.method
  const url = request.url

  console.log(method, url)
  // WHAT HAPPENS IN BETWEEN?????

  if (method === 'GET') {
    response.statusCode = 200

    if (url === '/dogs') {
      response.end('YOU WANT DOGS')
    } else if (url === '/kanye') {
      // send back the kanye html page

      // GRAB THE HTML PAGE
      response.setHeader('Content-Type', 'text/html')
      response.setHeader('Best-Header', 'nima')
      // SEND THAT HTML PAGE
      response.end(kanyePage)
    } else {
      response.end('LITERALLY ANYTHING ELSE')
    }

  } else {
    response.statusCode = 418
    response.end('THAT WASNT A GET REQUEST')
  }
})

server.listen(1337, function () {
  console.log('I AM LISTENING')
})