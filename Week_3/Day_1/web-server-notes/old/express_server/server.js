var express = require('express')
var morgan = require('morgan')

var app = express()

app.use(morgan('tiny'))

app.set('view engine', 'ejs')

var count = 0
app.use(function (req, res, next) {
  console.log('YET ANOTHER REQUEST!')
  console.log(count)
  count++

  next()
})

var port = 8080

var dogs = {
  spot: {
    name: 'Spot',
    breed: 'Chihuahua'
  },
  jujube: {
    name: 'Jujube',
    breed: 'Chiweenie'
  }
}

// A route
app.get('/', function(req, res) {
  // console.log(request)

  var templateVars = {
    message: 'What up from Express!'
  }

  res.render('index', templateVars)
})

app.get('/dogs', function (req, res) {
  // res.json(dogs)
  var templateVars = {
    dogs: dogs
  }

  res.render('dogs', templateVars)
})

// GET /dogs/spot
// GET /dogs/cthulhu
// GET /dogs/1273182763
app.get('/dogs/:name', function (req, res) {
  var dogName = req.params.name
  var dog = dogs[dogName]

  // res.json(dog)

  var templateVars = {
    dog: dog
  }

  res.render('dog', templateVars)
})

app.post('/dogs', function (req, res) {
  res.send('creating dog!')
})


app.listen(port, function () {
  console.log('I am listening on', 8080)
})