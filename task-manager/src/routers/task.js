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

// GET /tasks?completed=true or false
// GET/ tasks?limit=10&skip=0 (pagination) skip 10 would be second set of 10 result, skip 20 would be the third etc
// GET/ tasks?sortBy=createdAt:asc or :desc
router.get('/tasks', auth, async(req, res) => {
    const match = {}
    const sort = {} // 1 is ascending, -1 is descending

    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    if (req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1 //value comes from parts array and using it as name of property for sort.
    }

    try {
        await req.user.populate({
            path:'tasks', 
            match, // is an object where you can specify which tasks you're trying to match.
            options: { //can be used for pagination and also for sorting
                limit: parseInt(req.query.limit), // taking the query string and parsing the limit from a string into a int value for this option.
                skip: parseInt(req.query.skip),
                sort
            }
        })

        res.send(req.user.tasks)
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