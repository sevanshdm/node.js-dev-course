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