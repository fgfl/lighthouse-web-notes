// HTTP

/*

- create an HTTP server
- the server is supposed to listen
- whenever someone makes ANY request, respond with Hello world, 200

*/

const http = require('nimas-http')

const server = http.createServer()

server.on('request', (client) => {
    // a request has happened, now I send back a response
    // server.write("asdasd")
    client.respondText("Hello world")
    client.respondStatus(200)

})