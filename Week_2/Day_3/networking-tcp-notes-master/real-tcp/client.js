const net = require('net')
const stdin = process.stdin
stdin.resume()

// interpret incoming data as text
stdin.setEncoding('utf8'); 


const client = net.createConnection({
    host: '192.168.88.211',
    port: 1337
})

client.setEncoding('utf8')

stdin.on('data', data => {
    if (data === '\\q\n') {
      client.end();
      process.exit();
    } // \q quitting

    client.write(data)
})


client.on('connect', () => {
    client.write('Hello world!')
})

client.on('data', (data) => {
    console.log(data)
})

