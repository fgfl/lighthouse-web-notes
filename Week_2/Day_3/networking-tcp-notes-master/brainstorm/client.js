// when this script starts, create a "connection"
// that connection should be to the server's address

// stretch: after connecting, send a message

const clientUtils = require('client-utils')

const client = clientUtils.createClient("192.8.123872.123")

client.open(() => {
    // send a message
})

