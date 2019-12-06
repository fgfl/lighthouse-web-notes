const net = require('net')

const client = net.createConnection({
    // where should I connect?
    host: '192.168.88.45',
    port: 88  
})

// const emoji = ['🥫', '🤖', '🎺', '🚚']

client.on('connect', () => {
    console.log('I connected!')
    client.write("Hello world!")
    console.log('After writing the message')
})