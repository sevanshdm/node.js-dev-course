require('../../task-manager/src/db/mongoose')
const User = require('../../task-manager/src/models/user')

                        // id                                   returns updated document to db
// User.findByIdAndUpdate('6526d3f9ef065e1ce689a08a', { age: 33 }, { new: true }).then((user)=>{
//     console.log(user)
//     return User.countDocuments({ age: 33 }) // counts amount of users with the age of 33
// }).then((result)=> {
//     console.log(result)
// }).catch((e)=>{
//     console.log(e)
// })

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, {age})
    const count = await User.countDocuments({age})
    return count
}

updateAgeAndCount('6526d3f9ef065e1ce689a08a', 32).then((count) =>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})
