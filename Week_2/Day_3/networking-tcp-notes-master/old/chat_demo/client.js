const net = require('net')
const stdin = process.stdin
stdin.resume()

// interpret incoming data as text
stdin.setEncoding('utf8'); 

const client = net.createConnection({
    // where should I connect?
    host: '192.168.88.45',
    port: 88  
})

stdin.on('data', data => {
    if (data === '\\q\n') {
        client.end();
        process.exit();
    } // \q quitting

    client.write(data)
})

client.on('connect', () => {
    console.log('I connected!')
    client.write("Hello world!")
    console.log('After writing the message')
})

client.on('data', (data) => {
    console.log('--:', data)
})

client.setEncoding('utf8')