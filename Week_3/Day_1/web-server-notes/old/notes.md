# W 2 D 2 - Lecture

## Web Servers 101: Express

- WHAT THE HECK IS A SERVER
  - THE CODE I WRITE IN THE FIRST PART.... DON'T DO IT.

- HOW DO WE MAKE A SERVER
  - EXPRESS


Vocab: 

How to make an HTTP client

HTTP - Hypertext transfer protocol

REQUESTS
==========
GET - THINGS
POST
PUT
DELETE

RESPONSE
=========
- STATUS CODES - 200, 404
- HEADERS
  - OFTEN SOME DATA


GET /anotherDate?

403 FORBIDDEN


Vocab:

HTTP IS A resource-based protocol

- nouns.... 

HTTP is a state-less protocol
- it doesn't remember previous requests
  - everything the server needs should be sent with the request


*GITHUB DOWNLOADER PROJECT*

- REQUESTS - client
- RESPONSES - server

HTTP requests to a black box (magic)
Today we open up that black box!

BACKEND DEVELOPMENT


=== HTTP CREATESERVER IS GARBAGE

## AN ABSTRACTION .... EXPRESS

- LETS GET RID OF THAT STUFF (IF STATEMENTS)

DECLARING

- get request to /dogs, do this

- post request to /dogs, do this other thing

- get request to /kanye, do this


EXPRESS IS GOOD FOR TWO THINGS

1) Routing
2) Middleware
   1) ANYTHING that we need to happen between receiving the request and sending out the response

 
