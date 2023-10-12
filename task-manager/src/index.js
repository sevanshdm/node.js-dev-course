const express = require('express')
require('./db/mongoose') //import mongoose.js file
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

// automatically parses incoming json into an object.
app.use(express.json())

// request handlers
app.post('/users', (req, res)=> {
    const user = new User(req.body)

    user.save().then(() => {
        res.status(201).send(user) //sends back the status (created) and result.
    }).catch((e) => {
        res.status(400).send(e) //sends back the status to the client so they know what kind of error it is.
        
    })
})

// route handler for fetching multiple users
app.get('/users', (req,res) => {
    User.find({}).then((users) => { // leaving the object as empty fetches all users stored in the database
        res.send(users)
    }).catch((e) => {
        res.status(500).send() // sends internal service error message
    })
})

// route handler to fetch an individual user by ID
     // (dynamic) the ID of the user trying to fetch with express's "route parameters" which are parts of the url that are used to capture dynamic values.
app.get('/users/:id', (req,res) => {
    const _id = req.params.id //matches with up above, this contains all the route parameters that were provided.

    User.findById(_id).then((user) => {
        if(!user) {
            return res.status(404).send()
        }

        res.send(user)
        
    }).catch((e) => {
        res.status(500).send()
    })
})

app.post('/tasks', (req, res) => {
    const task = new Task(req.body)

    task.save().then(() => {
        res.status(201).send(task)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})