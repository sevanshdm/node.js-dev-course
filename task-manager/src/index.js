const express = require('express')
require('./db/mongoose') //import mongoose.js file
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

// automatically parses incoming json into an object.
app.use(express.json())

// registers the router with the existing app.
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

const bcrypt = require('bcryptjs')

const myFunction = async() => {
    const password = 'Red12345!'                    //Number of rounds to perform
    const hashedPassword = await bcrypt.hash(password, 8)

    console.log(password)
    console.log(hashedPassword)

    // checks to see if the hashed password is the same
    const isMatch = await bcrypt.compare('red12345!', hashedPassword)
    console.log(isMatch)
}

myFunction()

// With encryption, you can get the original value back, you can't do that with hashing.