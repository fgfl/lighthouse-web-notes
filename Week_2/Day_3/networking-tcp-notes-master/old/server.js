const net = require('net');

// console.log(net.createServer)

const server = net.createServer();

// when someone connects to me, console.log('hello! new connection!')

const everyone = [];

server.on('connection', function(connection) {
  let user = Math.random()
  connection.setEncoding('utf8')

  everyone.push(connection)

  console.log('someone connected');
  broadcast('Someone just connected');
  connection.write('Welcome! Anything is possible at Nimbo.com')

  connection.on('data', function (data) {
    broadcast('new message from user ' + user + ': ' + data)
  })

})

const broadcast = function (message) {
  for (let person of everyone) {
    person.write(message)
  }
}

console.log('Listening on :9999')
server.listen(9999)

