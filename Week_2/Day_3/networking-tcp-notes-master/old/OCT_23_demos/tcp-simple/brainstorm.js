// listens for connections

const server = require('serverstuff')
// ASYNC
// whenever there is a new connection, console.log

const action = () => {
    console.log('NEW CONNECTION!')
}

// function
server.listen()

server.on('connection', action)