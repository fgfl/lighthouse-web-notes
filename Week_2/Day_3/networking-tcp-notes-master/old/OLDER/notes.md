
Brian: "Not great, but so valuable. Extremely useful."

The last couple exercises weren't computing.

- the end was tougher!

- Testing async values: feeling like we're copying and pasting
- You can't return out of async stuff (the scope no longer exists)  
  - the recursion one: fun profile generator

## W 2 D 3: Networking with TCP + HTTP

What does networking mean?

- Communicating between computers

We need to come up with particular protocols

- Any medium, e.g. a wire

- WIRE itself
- Everyone gets like 5 seconds, and then you move over and let the next person go
- You have to introduce yourself.


TCP/IP
  - trasnport

IP: a highway between computers
TCP: the trucks on the highway going to find a particular computer
HTTP: is the load on the trucks


```js
const seeIfSomeoneConnected = function () {
  if (server.connections) {
    console.log('someone connected')
  }
}

setInterval(seeIfSomeoneConnected, 100)
```


CLIENT: MAKES A REQUEST TO THE SERVER

A REQUEST:
  - KIND OF REQUEST (am I asking to get some stuff? do I want to create a new thing?) [GET, POST, PUT, DELETE]
  - BODY ? data
  - Extra information for ID

SERVERUS SNAPE: PROCESSES THE REQUEST, AND THEN SENDS A RESPONSE

CLIENT: RECEIVES THE RESPONSE

RESPONSE:
  - A STATUS CODE, did it work? did you have permission?
                    - maybe something broke
    - 200, 404, 302, 500
  - Data that you asked for