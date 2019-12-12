# Week 3 Day 3

User Auth

- HTTP review
- Express review

- Why cookies? Do you want a cookie? Mmmm
- A list of my favourite cookies
    - chocolate chip

HTTP:
- request response

Express:
- creating servers
- middleware is a big part of this
- middleware?
    - the stuff that exists between the request and the response
    - "pipeline"

- examples of middleware:
    - defining routes (GET /dogs, POST, DELETE)
    - body-parser
        - whenever a request with some "body" comes in, this middleware ensures that the body is human-readable as an object
    - cookie-parser
        - parses cookies
    - analytics stuff





## HTTP

HTTP is a resource-based protocol

resource === noun === data

HTTP: GET /something
      POST /something

HTTP is a state-less protocol
- what does that mean?
    - each request and response is independent

A -------- B

Each caller (client) states an ID


HTTP MESSAGE
- POST /login
    - some login happened

- the person receives some ID

- GET
- /statuses
- ID

Cookie:
- stamp!


Overview of Auth:
=================

- sometimes there are things that are user dependonte
    - posts, friends
- the server needs to know who it's talking to to send back the right results
- automatic addition of our ID from the client side every time