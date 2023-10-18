require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('6526d6a83ac6eb09873505ce').then((task)=>{
//     console.log(task)
//     return Task.countDocuments({ completed: false })
// }).then((result) => {
//     console.log(result)
// }).catch((e)=>{
//     console.log(e)
// })

const deleteTaskAndCount = async(id) => {
    // these bottom two can be used because these mongoose methods return promises
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed: false})
    return count
}

deleteTaskAndCount('65280115a84c7fe5678fd369').then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})