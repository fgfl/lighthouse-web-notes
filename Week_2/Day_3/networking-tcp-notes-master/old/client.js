const net = require('net');
const stdin = process.stdin

stdin.setEncoding('utf8');

const client = net.createConnection({ 
  host: '192.168.88.52',
  port: 9999
});

client.setEncoding('utf8'); 

client.on('data', function (stuff) {
  console.log('stuff:', stuff)
})

stdin.on('data', data => {
  client.write(data)
})