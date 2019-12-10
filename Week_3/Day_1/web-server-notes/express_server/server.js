// bring in express
var express = require('express')

// use the 'express' function to create a new app
var app = express() // similar to createServer, but cleaner!
var port = 8080

app.set('view engine', 'ejs');

var animals = [
  {
    name: 'dog',
    emoji: '🐕',
    description: 'cool!',
    sound: 'woof!'
  },
  {
    name: 'cat',
    emoji: '🐈',
    description: 'I like some cats',
    sound: 'meow!'
  },
  {
    name: 'horse',
    emoji: '🐎',
    description: 'I dont really like horse!',
    sound: 'neigh!'
  },    
]
// when someone makes a GET / request, respond with 'hello world'
app.get('/', function (request, response) {
  response.send('Hello World!')
})

app.post('/', function (request, response) {
  response.send('You made a POST request')
})

app.get('/animals', function (request, response) {
  // send JSON back
  // response.json(animals)

  var templateVars = {
    animals: animals
  }

  response.render('animalsPage', templateVars)
})

app.get('/animals/:animalID', function (request, response) {
  var animalId = request.params.animalID

  var templateVars = {
    animal: animals[animalId]
  }

  response.render('animalPage', templateVars)
})

app.get('/animals/:animalID/json', function (request, response) {
  // console.log(request.params.animalIndex)
  var animalID = request.params.animalID
  response.json(animals[animalID])
})


// start listening
app.listen(port, function() {
  console.log(`Example app listening on port ${port}!`)
})