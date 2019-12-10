const http = require('http')
var fs = require('fs')

const kanyePage = `
        
<h1>YEEZY</h1>
<p>I am Nima Boscarino</p>
<img src="asdasd"/>

`

var homePage = fs.readFileSync("./index.html")


const makeArticlePage = data => {
    return `
        <h1>${data.title}</h1>
        <p>${data.content}</p>
    `
}

// callback for EVERY request
const server = http.createServer((request, response) => {
    // console.log("REQUEST", request)
    if (request.url === '/kanye' && request.method === 'POST') {
        response.end(kanyePage)
    } else if (request.url === "/norah") {
        response.end("I wish Norah Jones would collab with Kanye, but like 2008 Kanye.")
    } else {
        response.statusCode = 418
        response.end(homePage)
    }
    // console.log(response)
})

server.listen(1234, () => {
    console.log('I AM LISTENING ON 1234')
})