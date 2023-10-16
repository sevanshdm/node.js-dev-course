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

// gets all tasks
router.get('/tasks', auth, async(req, res) => {
    try {
        const tasks = await Task.find({ owner: req.user._id })
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

// fetch task by id
router.get('/tasks/:id', auth, async (req,res)=>{
    const _id = req.params.id

    try {
        const task = await Task.findOne({ _id, owner: req.user._id })

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
router.patch('/tasks/:id', auth, async (req, res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']

    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid updates'})
    }

    try{
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id}) // find a task that takes the owner into account
        
        if(!task){
            res.status(404).send()
        }
        updates.forEach((update)=> task[update] = req.body[update])
        await task.save()
        res.send(task)

    }catch(e){
        res.status(400).send(e)
    }

})

// Deletes a task by ID
router.delete('/tasks/:id', auth, async (req, res) => {
    try{
        const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id})

        if(!task){
            res.status(404).send()
        }
        res.send(task)

    }catch(e){
        res.status(500).send()
    }
})

module.exports = router