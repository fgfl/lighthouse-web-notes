/*
    I want to connect to a server
    I want to send a message to the server
    "Hello world!"
*/


const sendMessage = function (server) {
    server.send("Hello world!")
}

const server = startConnection("server-1", sendMessage)

server.onConnect(sendMessage)

// // the server might not YET be connected
// if (server.connection === true) {
//     server.send("hello world!")
// }

// program terminates