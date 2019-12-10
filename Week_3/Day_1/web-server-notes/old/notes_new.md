# W 2 D 2: Intro to Servers (Express 101)

HTTP:

Hypertext
  - HTML, special text
Transfer
  - I see something I want, I ask for it
Protocol
  - https://tools.ietf.org/html/rfc2616

HTTP request for something, HTTP response (contains the thing, or a message)

HTTP is a resource-based protocol
  - get away from the idea of requesting a webpage, we are asking for a RESOURCE

HTTP is a state-less protocol
  - there's no state
  - there is no connection between the first and second request, etc.
  - everything that the server needs should be sent with the request

HTTP - Client and a Server
Client sends a request 
  - Verb (GET, POST, DELETE, PUT)
  - PATH (/dogs, GET /api/contributors/)
  - OPTIONALLY - data
    - POST /dogs {name: spot, breed: german shepherd}
  - Optional Headers

Server sends Response:
  - Header
  - Body
  - Status Code
    - 404, 200, 300, 500, 401

Github API project
==================

- HTTP requests to a black box (magic)
- Today we open up that box!

This is Back End development.


I wish there was a better way to send back data
And I wish there was a better way to declare these "routes" (VERB + PATH)

Express
========

1) Routing
2) Middleware
   1) Anything that we need to happen between the request and response

