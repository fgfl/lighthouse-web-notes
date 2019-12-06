# W2 D3: Networking with TCP + HTTP

All the code for the lecture is here: https://github.com/NimaBoscarino/networking-tcp-notes

Hi everyone! Thanks for sitting in on today's lecture. Networking is a big topic, but the main things to keep in mind are:

1) Our computers scream at each other through wires
2) We can impose some structure on how they're allowed to scream at each other

We started off with a bit of review:

What does networking mean?

- Communicating between computers

We need to come up with particular protocols

Communication for computers happens between a medium!

- Any medium, e.g. a wire

We can layer some restrictions over the medium. For example...

- WIRE itself
- Everyone gets like 5 seconds, and then you move over and let the next person go
- You have to introduce yourself.

## TCP, IP, and HTTP

- IP: a highway between computers
  - how you use the physical stuff
- TCP: the trucks on the highway going to find a particular computer
- HTTP: is the load on the trucks

## Demo

For today's demo we built a TCP chat app. We have a TCP server that listens for connections, and broadcasts messages to clients that are connected. Our TCP client code is able to connect to the server, send messages to it, and receive messages from it. We used `stdin` to get whatever a user types. Take a look at the code in `client.js` and `server.js` for this.

Note that some of the code that we write has to use callbacks because we want to register callbacks for things that happen _later_. For example, we don't know _when_ our client will receive a message from the server. Or on the server-side, we don't know _when_ the server will receive a new connection. For that reason, we came up with the idea of registering something like `setInterval` to keep checking to see if someone connected. NOTE! THIS IS NOT ACTUAL CODE THAT YOU CAN RUN.

```js
const seeIfSomeoneConnected = function () {
  if (server.connections) {
    console.log('someone connected')
  }
}

setInterval(seeIfSomeoneConnected, 100)
```

Then we saw that the `net` module actually handles this for us when we write something like:

```js
server.on('connection', function (connection) {
  // etc.
})
```

Fun stuff! Take a look through the code in `server.js` to see how that's being used.

## HTTP

We ended off the lecture with a short discussion about HTTP. HTTP is a _way to use TCP_. In other words, it's a protocol that says HOW we should use TCP. HTTP has some opinions, which involve a CLIENT and a SERVER.

CLIENT: MAKES A REQUEST TO THE SERVER

A REQUEST IS MADE UP OF:

  - KIND OF REQUEST (am I asking to get some stuff? do I want to create a new thing?) [GET, POST, PUT, DELETE]
  - BODY ? data
  - Extra information for ID

SERVER: PROCESSES THE REQUEST, AND THEN SENDS A RESPONSE

CLIENT: RECEIVES THE RESPONSE

A RESPONSE RESPONSE IS MADE UP OF:

  - A STATUS CODE, did it work? did you have permission?
                    - maybe something broke
    - 200, 404, 302, 500
  - Data that you asked for

Have a great rest of the day, and let me know if you have any questions!