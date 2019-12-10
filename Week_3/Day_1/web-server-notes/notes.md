# W 2 D 2: Web Servers 101 w/ Express

HTTP:

- Hyper Text Transfer Protocol 

1 Person makes a request
the other person sends back a response

Request might look like:

- GET/PUT/POST/DELETE : Verb/Method
- /some/path/somewhere : Some path
  - /dogs
  - /posts
- optionally, some data

Method + Path === Route

Response looks like:

200, 404, 500, 401 : Status Code
Optionally, Data: JSON stuff, error messages, image, HTML, XML, text

HTTP is a r__urce-based protocol
- request
- read/write/delete, do actions on data (CRUD actions)
- route
- response
- resource!!!

Resource: Get away from thinking about asking a server for a particular "page", we're asking for a THING. or a collection of THINGS.

HTTP is a st_____-less protocol

- stateless
- the server won't remember who it's talking to
- Say I am Nima. I want to get my friends!
  - GET /friends
  - GET /posts


Github downloader project:

- HTTP requests to a "black box"

Client ----> |||A BIG WALL|||| ---> stuff happens here
       <----                  <------


Hey, if we have this idea of "routes", why can't I just say:

- GET /dogs
  - return all the dogs (JSON)
- GET /kanye
  - show the kanye page (HTML)
- GET /:artist
  - show that artist's page (HTML)

```js
get('/kanye', function () {
  doSomething()
})

post('/dogs', function () {
  doSomethingElse()
})
```


