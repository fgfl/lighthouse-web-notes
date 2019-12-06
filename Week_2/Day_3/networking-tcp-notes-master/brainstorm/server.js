// When this script runs, start a server
// The server should listen for connections
// When you get a connection, console.log "New Connection"

const serverUtils = require('server-utils')

const server = serverUtils.createServer()

// PORT

server.listen()

server.onConnection = () => console.log("New Connection")