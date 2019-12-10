const express = require('express')
const morgan = require('morgan')

const app = express()

app.set('view engine', 'ejs')

// app.use((request, response, next) => {
//     console.log('New Request')
//     console.log('METHOD:', request.method)
//     console.log('URL:', request.url)
//     next()
// })

app.use(morgan('dev'))

app.use((req, res, next) => {
    if (req.url === '/kanye') {
        res.send("Kanye Page YEEZY")
    } else {
        next()
    }
})

app.get('/norah', (req, res) => {
    res.send("Norah pls")
})

app.post('/music', (req, res) => {
    res.send("Adding new music")
})

const dogs = {
    nasa: {
        name: "Nasa",
        favFood: "Potatoes",
        quirkyFact: "Im a dog!"
    },
    rocky: {
        name: "Rocky",
        favFood: "Everything",
        quirkyFact: "Rocky fights bears!"
    },    
}

app.get('/dogs/:dogName', (req, res) => {
    const dogName = req.params.dogName
    const dog = dogs[dogName]

    let templateVars = {
        dog: dog
    }
    // res.send(dog)
    res.render('dogPage', templateVars)
})




app.listen(5243, () => {
    console.log("EXPRESS IS LISTENING ON 5243")
})