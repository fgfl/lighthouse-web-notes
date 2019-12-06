const net = require('net');

const server = net.createServer();

// make list of clients [], loop through to broadcast

server.on('connection', connection => {
  connection.setEncoding('utf8')
  console.log('woo, new connection')

  // connection.write() to a client to welcome them
  connection.write('welcome!')

  connection.on('data', data => {
    console.log('data', data)
  })
})

server.on('close', () => { 
  console.log(`Server disconnected`);
});

server.listen(4000);
