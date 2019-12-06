const net = require('net')

const server = net.createServer()

const everyone = []

const doAfterConnection = (connection) => {
    console.log('New connection')

    everyone.push(connection)

    connection.setEncoding('utf8')

    connection.on('data', (data) => {
        console.log('NEW MESSAGE FROM A CLIENT', data)

        // send that message to everyone
        for (client of everyone) {
            client.write('Message: ' + data)
        }
        
        // connection.write('Thanks for the data!')
    })
}

server.on('connection', doAfterConnection)


server.listen(1337)