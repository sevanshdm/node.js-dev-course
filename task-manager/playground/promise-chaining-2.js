require('../src/db/mongoose')
const Task = require('../src/models/task')

Task.findByIdAndDelete('6526d6a83ac6eb09873505ce').then((task)=>{
    console.log(task)
    return Task.countDocuments({ completed: false })
}).then((result) => {
    console.log(result)
}).catch((e)=>{
    console.log(e)
})