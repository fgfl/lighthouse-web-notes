const express = require('express')
const app = express() // engine
const port = 3000

app.set('view engine', 'ejs')

app.get('/', function (req, res){
  res.render('index')
})

//URL PARAMETER -> GET /dogs/12, GET /dogs/15, GET /dogs/spot
app.get('/users/:userName', function (req, res){
  var templateVars = {
    name: req.params.userName
  }

  res.render('user', templateVars)
})

//URL PARAMETER -> GET /dogs/12, GET /dogs/15, GET /dogs/spot
app.get('/dogs/:dogName', function (req, res){
  res.send('YOUR DOG IS CALLED ' + req.params.dogName)
})

app.get('/someJson', function (req, res){
  res.json({
    message: 'Hello world',
    age: 1000
  })
})

app.listen(port, function () {
  console.log("Example app listening on port " + port + "!")
})
