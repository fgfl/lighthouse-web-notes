const net = require('net')

const server = net.createServer()

server.on('connection', (client) => {
    console.log('New connection!')
    // console.log(client)
    client.setEncoding('utf8')

    client.on('data', (data) => {
        console.log(data)
    })
})

server.listen(88)
