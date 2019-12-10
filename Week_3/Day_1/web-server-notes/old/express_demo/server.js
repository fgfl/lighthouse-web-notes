const express = require('express')
const app = express()
const port = 8080
app.set('view engine', 'ejs');


// something that happens between the request and the response
app.use((req, res, next) => {
  console.log('A NEW REQUEST HAS BEEN MADE')
  next()
})

let dogs = [
  {
    name: 'Otis',
    breed: 'Frenchie mix',
    size: 'pretty teeny',
    personality: 'feisty'
  },
  {
    name: 'Huxley',
    breed: 'Black lab',
    size: 'too big',
    personality: 'gregarious'
  }
]

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/dogs', (req, res) => { 
  let templateVars = {
    dogs: dogs
  }
  res.render("dogs", templateVars)
})

app.get('/dogs/:someDogID', (req, res) => {
  console.log(req.params)
  // res.json(dogs[req.params.someDogID])
  let templateVars = {
    dog: dogs[req.params.someDogID]
  }

  res.render("show_dog", templateVars)

})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


// app.get('/dogs', (req, res) => { 
//   res.json(dogs)
// })