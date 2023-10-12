const express = require('express')
require('./db/mongoose') //import mongoose.js file
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

// automatically parses incoming json into an object.
app.use(express.json())

// request handlers
app.post('/users', async (req, res)=> {
    const user = new User(req.body)

    try {
        //saves the user
        await user.save()
        // code below will run if the above line works.
        res.status(201).send(user) //sends back the status (created) and result.
    }catch (e) {
        res.status(400).send(e) //sends back the status to the client so they know what kind of error it is.
    }
})

// route handler for fetching multiple users
app.get('/users', async (req,res) => {

    try {
        const users = await User.find({}) // leaving the object as empty fetches all users stored in the database
        res.send(users)
    }catch(e){
        res.status(500).send() // sends internal service error message
    }
})

// route handler to fetch an individual user by ID
     // (dynamic) the ID of the user trying to fetch with express's "route parameters" which are parts of the url that are used to capture dynamic values.
app.get('/users/:id', async (req,res) => {
    const _id = req.params.id //matches with up above, this contains all the route parameters that were provided.

    try{
        const user = await User.findById(_id)

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    }catch (e) {
        res.status(500)
    }

    // User.findById(_id).then((user) => {
    //     if(!user) {
    //         return res.status(404).send()
    //     }

    //     res.send(user)

    // }).catch((e) => {
    //     res.status(500).send()
    // })
})

// express route handler for updating user by id
app.patch('/users/:id', async (req, res) =>{
    const updates = Object.keys(req.body) //converts an object into an array of its properties
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update)) // function runs for every item in the array

    if(!isValidOperation){
        return res.status(400).send({ error: 'Invalid updates!'})
    }

    try {                                                       // The data for the id will passed through via the HTTP request.
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }) // {new:true} returns the new user as opposed to the existing one found before update.
                                                                                     // runs validation before the update
        if(!user){
            return res.status(404).send()
        }
        
        res.send(user)
    }catch(e) {                                                                      
        res.status(400).send(e)
    } 
})

app.post('/tasks', async(req, res) => {
    const task = new Task(req.body)

    try{
        await task.save()
        res.status(201).send(task)
    }catch(e) {
        res.status(400).send(e)
    }
    // task.save().then(() => {
    //     res.status(201).send(task)
    // }).catch((e) => {
    //     res.status(400).send(e)
    // })
})

app.get('/tasks', async(req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    }catch(e){
        res.status(500).send()

    }
    // Task.find({}).then((tasks)=> {
    //     res.send(tasks)
    // }).catch((e)=>{
    //     res.status(500).send()
    // })
})

app.get('/tasks/:id', async (req,res)=>{
    const _id = req.params.id

    try {
        const task = await Task.findById(_id)

        if(!task){
            return res.status(404).send
        }
        res.send(task)
    }catch(e){
        res.status(500).send()
    }

    // Task.findById(_id).then((task)=>{
    //     if(!task){
    //         return res.status(404).send()
    //     }
    //     res.send(task)
    // }).catch((e)=>{
    //     res.status(500).send()
    // })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})