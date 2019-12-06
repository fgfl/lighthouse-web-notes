const net = require('net')

const server = net.createServer()

const everyone = []

const broadcast = (message) => {
    for (const client of everyone) {
        client.write(message)
    }
}

server.on('connection', (client) => {
    client.setEncoding('utf8')
    broadcast('A new client has connected')

    client.on('data', (data) => {
        broadcast(data)
    })



    everyone.push(client)

    client.write('Welcome!') 
    console.log('NEW CONNECTION!')
})

server.listen(999)