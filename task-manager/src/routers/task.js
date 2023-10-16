const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/tasks', auth, async(req, res) => {
    const task = new Task({
        ...req.body, // copies all of the properties from body over to the Task object.
        owner: req.user._id // The id of the person that was just authenticated. 
    })

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

router.get('/tasks', async(req, res) => {
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

router.get('/tasks/:id', async (req,res)=>{
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

// express route handler for updating tasks by id
router.patch('/tasks/:id', async (req, res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']

    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid updates'})
    }

    try{
        const task = await Task.findById(req.params.id)

        updates.forEach((update)=> task[update] = req.body[update])

        await task.save()
        
        if(!task){
            res.status(404).send()
        }
        res.send(task)
    }catch(e){
        res.status(400).send(e)
    }

})

// Deletes a task by ID
router.delete('/tasks/:id', async (req, res) => {
    try{
        const user = await Task.findByIdAndDelete(req.params.id)

        if(!user){
            res.status(404).send()
        }
        res.send(user)

    }catch(e){
        res.status(500).send()
    }
})

module.exports = router