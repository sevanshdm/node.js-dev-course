const express = require('express')
require('./db/mongoose') //import mongoose.js file
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()

// automatically parses incoming json into an object.
app.use(express.json())

// registers the router with the existing app.
app.use(userRouter)
app.use(taskRouter)

module.exports = app