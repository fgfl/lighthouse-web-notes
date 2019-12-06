const net = require('net')

const server = net.createServer()

const clients = []

server.on('connection', (client) => {
    console.log('New connection!')
    clients.push(client)
    // console.log(client)
    client.setEncoding('utf8')

    client.write('Welcome to Nima Chat!')

    client.on('data', (data) => {
        console.log(data) // print on server

        // send it to all the clients
        for (individualClient of clients) {
            individualClient.write(data)
        }

    })
})

server.listen(88)
