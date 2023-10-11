const express = require('express')
require('./db/mongoose') //import mongoose.js file
const User = require('./models/user')

const app = express()
const port = process.env.PORT || 3000

// automatically parses incoming json into an object.
app.use(express.json())

// request handlers
app.post('/users', (req, res)=> {
    const user = new User(req.body)

    user.save().then(() => {
        res.send(user)
    }).catch((e) => {
        res.status(400).send(e) //sends back the status to the client so they know what kind of error it is.
        
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})