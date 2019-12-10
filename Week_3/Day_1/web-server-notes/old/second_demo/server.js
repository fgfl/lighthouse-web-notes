const express = require('express')
const morgan = require('morgan')

const app = express() // createapp

app.set('view engine', 'ejs');

app.use(function (request, response, next) {
  console.log('WOOP WOOP')
  next()
})

app.use(morgan('tiny'))

const dogs = {
  frida: {
    name: 'Frida',
    breed: 'Golden Lab',
    favouriteFood: 'chicken necks',
    favouriteKanyeAlbum: 'Yeezus'
  },
  spot: {
    name: 'Spot',
    breed: 'Pug',
    favouriteFood: 'spaghetti',
    favouriteKanyeAlbum: 'College Dropout'
  },
  barktholomew: {
    name: 'Barktholomew',
    breed: 'Greyhound',
    favouriteFood: 'Beluga Caviar',
    favouriteKanyeAlbum: 'Watch The Throne'
  }
}

app.get('/', function (req, res) {
  console.log(req)
  res.send('HAHA AYY LMAO')
})

// dogs/spot, dogs/frida, dogs/bartholomew, dogs/richard
app.get('/dogs/:dogName', function (request, response) {
  const dog = dogs[request.params.dogName]
  // response.json(dog)

  let templateVars = {
    dogName: dog.name,
    dogBreed: dog.breed,
    dogFood: dog.favouriteFood,
    dogAlbum: dog.favouriteKanyeAlbum,
  }

  response.render('dogsPage', templateVars)
})

app.delete('/potato', function (request, response) {
  console.log(request)
  response.send('BYE POTATO')
})

app.get('/kanye', function (request, response) {
  // get the kanye page

  // send the kanye page
  response.render('kanyePage')
})

app.listen(8080, function () {
  console.log('I AM LISTENING ON 8080')
})
