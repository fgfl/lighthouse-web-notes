// needs to connect to the server

const client = createConnection('localhost:999')

client.on('connection', () => {
    console.log('I CONNECTED')
})

// after connecting, print out "I CONNECTED!"