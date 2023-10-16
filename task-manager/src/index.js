const express = require('express')
require('./db/mongoose') //import mongoose.js file
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

                // specific to registering middleware
// app.use((req, res, next)=>{ // this function is going to run in between the request coming to the server and the route handler actually running.
//         if(req.method === 'GET') {
//             res.send('GET requests are disabled.')
//         }else {
//             next()
//         }
// })

// app.use((req, res, next)=>{
//         res.status(503).send('The site is under maintenance. Please try again later.')
// })


// automatically parses incoming json into an object.
app.use(express.json())

// registers the router with the existing app.
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

const Task = require('./models/task')
const User = require('./models/user')

// const main = async () => {
//     // const task = await Task.findById('652d5bf932ab728090a6c0ae')
//     // await task.populate('owner') //allows you to populate data from a relationship, such as the data we have from owner.
//     // console.log(task.owner)

//     const user = await User.findById('652d5a4cecd222432b1ddf0a')
//     await user.populate('tasks')
//     console.log(user.tasks)
// }

// main()

// const jwt = require('jsonwebtoken')

// const myFunction = async() => {  
// //Token creation.      object with data to be embedded    The signature /A secret that signs the token, making sure it hasn't be altered or tampered with.
//     const token = jwt.sign({_id: 'abc123'}, 'thisismynewcourse', { expiresIn: '1 second'}) 
//     console.log(token)

//     // Verifies token
//     const data = jwt.verify(token, 'thisismynewcourse')
//     console.log(data)
// }

// myFunction()

// With encryption, you can get the original value back, you can't do that with hashing.