var express = require('express')
var app = express() // app is now the "engine"
const port = 3000

app.set('view engine', 'ejs')

let hitCount = 0

app.use(function (req, res, next) {
  // go to next step in middleware chain
  hitCount++
  console.log(`hits: ${hitCount}`)

  next()
})

app.use(express.static('public'))

let animals = ['dog', 'cat', 'cassowary']

function bootUp () {
  console.log('Booted up!')
}

app.get('/', function (req, res) {
  res.send('Ayyy')
})

app.get('/animals/:id', function (req, res) {
  res.render('index', { animal: animals[req.params.id] })

  // res.json({message: "Your animal is: " + animals[req.params.id]})
})

app.listen(port, bootUp)
