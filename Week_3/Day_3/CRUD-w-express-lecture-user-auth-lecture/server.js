const express = require('express')
const app = express()
const PORT = 3000
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true })) // this gives us req.body
app.use(cookieParser())
app.use(cookieSession({
    name: 'session',
    keys: ['ayy', 'what', 'up', 'my', 'dudes', 'it is wednesday'],
  
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }))
  
// bcrypt

// Nima's Cookie Parser
// app.use((req, res, next) => {
//     const cookieString = req.headers.cookie
//     const cookies = cookieString.split('; ').map(c => c.split('='))
//     // console.log(cookies)

//     req.nima_cookies = cookies
//     next()
// })



const users = {
    '5cu2t': {
        name: "nima",
        password: "potatoes"
    },
    '7bn18s': {
        name: "bob",
        password: "bob123"
    },
    '7an01': {
        name: "bradlina",
        password: "tomato"
    },
}

const blogs = {
    '5sg1': {
        title: 'I love rain',
        content: `Oh man, can't get enough of it`,
        user: '7an01'
    },
    '61g236': {
        title: 'INSERT POLLITICALLY CHARGED STATEMENT',
        content: `Am I the only one who feels this way?`,
        user: '7bn18s'
    },
    '91bv16': {
        title: 'Its',
        content: `Ya boi`,
        user: '5cu2t'
    },        
}

app.get('/', (req, res) => {
    console.log('COOKIE PARSER', req.cookies)
    console.log('SESSION', req.session)
    // const user = req.nima_cookies[0][1]
    // const user = req.cookies.user || "Anonymous"
    const user = req.session.user || "Anonymous"

    req.session.hello = 'World'

    let templateVars = {
        blogs: blogs,
        user: user
    }

    res.render('index', templateVars)
})

app.get('/blogs', (req, res) => {
    res.redirect('/')
})

app.get('/blogs/new', (req, res) => {
    res.render('new_blog')
})

app.get('/users/new', (req, res) => {
    res.render('new_user')
})

app.get('/blogs/:id', (req, res) => {
    let blog = blogs[req.params.id]

    let templateVars = {
        blog: blog,
        blogID: req.params.id
    }

    res.render('edit_blog', templateVars)
})

app.post('/blogs', (req, res) => {
    console.log(req.body)
    const newBlog = {
        title: req.body.title,
        content: req.body.content
    }

    blogs[Math.random()] = newBlog

    res.redirect("/")
})

app.post('/blogs/:id', (req, res) => {
    const editedBlog = {
        title: req.body.title,
        content: req.body.content
    }

    blogs[req.params.id] = editedBlog

    res.redirect("/")
})

app.post('/blogs/:id/delete', (req, res) => {
    delete blogs[req.params.id]

    res.redirect("/")
})

app.get('/see-cookies', (req, res) => {
    // console.log(req.cookies)
    // console.log(res.cookie())
    res.cookie("Nima", "LKAHJSGDKJAHSGDKJHASGDKAJSD")
    res.cookie("Bradlina", "Hello world")

    res.send("HASDHASHDHASD")
})

app.get('/login/:user', (req, res) => {
    res.cookie("user", req.params.user)

    res.send("Logged in!")
})


app.post('/login', (req, res) => {
    // use the form data to set the cookie
    const userName = req.body.user
    const password = req.body.password

    let foundUser = null
    // check if password matches username
    for (const userId in users) {
        if (users[userId].name === userName && users[userId].password === password) {
            foundUser = users[userId]
        }
    }

    if (foundUser) {
        // res.cookie("user", foundUser.name)
        req.session.user = foundUser.name
        res.redirect('/')
    } else {
        res.send('bad login')
    }

})


app.listen(PORT, '0.0.0.0', () => {
    console.log(`Listening on ${PORT}`)
})