const express = require('express')
const User = require('../models/user')
// Use methods on router to customize it (router.post, router.get, router.patch, router.delete)
const router = new express.Router()

// request handlers
router.post('/users', async (req, res)=> {
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
router.get('/users', async (req,res) => {

    try {
        const users = await User.find({}) // leaving the object as empty fetches all users stored in the database
        res.send(users)
    }catch(e){
        res.status(500).send() // sends internal service error message
    }
})

// route handler to fetch an individual user by ID
     // (dynamic) the ID of the user trying to fetch with express's "route parameters" which are parts of the url that are used to capture dynamic values.
router.get('/users/:id', async (req,res) => {
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
router.patch('/users/:id', async (req, res) =>{
    const updates = Object.keys(req.body) //converts an object into an array of its properties
    const allowedUpdates = ['name', 'email', 'password', 'age']
    
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update)) // function runs for every item in the array

    if(!isValidOperation){
        return res.status(400).send({ error: 'Invalid updates'})
    }

    try { // Where to apply change, The data for the id will passed through via the HTTP request.
        const user = await User.findById(req.params.id)

        updates.forEach((update)=> user[update] = req.body[update])
        await user.save()

        if(!user){
            return res.status(404).send()
        }
        
        res.send(user)
    }catch(e) {                                                                      
        res.status(400).send(e)
    } 
})

router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }catch(e){
        res.status(500).send()
    }
})

module.exports = router