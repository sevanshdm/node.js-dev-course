const express = require('express')
const User = require('../models/user')
// Use methods on router to customize it (router.post, router.get, router.patch, router.delete)
const router = new express.Router()
const auth = require('../middleware/auth')
// request handlers
// Sign up a new user
router.post('/users', async (req, res)=> {
    const user = new User(req.body)

    try {
        //saves the user
        await user.save()

        // creates token for new user
        const token = await user.generateAuthToken()

        // code below will run if the above line works.
        res.status(201).send({user, token}) //sends back the status (created) and result.
    }catch (e) {
        res.status(400).send(e) //sends back the status to the client so they know what kind of error it is.
    }
})

// finds/verifies a user with the correct credentials.
router.post('/users/login', async(req, res)=>{
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    }catch(e){
        res.status(400).send()
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.token.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    }catch (e) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try{
        req.user.tokens = []
        await req.user.save()
        res.send()
    }catch{
        res.status(500).send()
    }
})

// route handler for fetching multiple users
// (dynamic) the ID of the user trying to fetch with express's "route parameters" which are parts of the url that are used to capture dynamic values.
router.get('/users/me', auth, async (req,res) => { // when /users receives a GET request, it first runs the middleware(auth), then it runs route handler.
    res.send(req.user)
//const users = await User.find({}) // leaving the object as empty fetches all users stored in the database
})

// express route handler for updating user
router.patch('/users/me', auth, async (req, res) =>{
    const updates = Object.keys(req.body) //converts an object into an array of its properties


    const allowedUpdates = ['name', 'email', 'password', 'age']

    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update)) // function runs for every item in the array

    if(!isValidOperation){
        return res.status(400).send({ error: 'Invalid updates'})
    }

    try { // Where to apply change, The data for the id will passed through via the HTTP request.

        updates.forEach((update)=> req.user[update] = req.body[update])
        await req.user.save()
        
        res.send(req.user)
    }catch(e) {                                                                      
        res.status(400).send(e)
    } 
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        // const user = await User.findByIdAndDelete(req.user._id)
        // if(!user){
        //     return res.status(404).send()
        // }

        await req.user.deleteOne({id: req.user._id})
        
        res.send(req.user.getPublicProfile())
    }catch(e){
        res.status(500).send()
    }
})

module.exports = router