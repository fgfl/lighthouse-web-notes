const net = require('net')
const stdin = process.stdin
stdin.resume()

// interpret incoming data as text
stdin.setEncoding('utf8'); 

const client = net.createConnection({
    // where should I connect?
    host: '192.168.88.84',
    port: 999
})

client.on('connect', () => {
    console.log('I CONNECTED')
})

client.on('data', (data) => {
    console.log(data)
})

client.setEncoding('utf8')

stdin.on('data', data => {
    if (data === '\\q\n') {
        client.end();
        process.exit();
    } // \q quitting

    // explore adding new feature (special messages)

    client.write(data)
})
