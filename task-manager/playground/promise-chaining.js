require('../src/db/mongoose')
const User = require('../src/models/user')

                        // id                                   returns updated document to db
User.findByIdAndUpdate('6526d3f9ef065e1ce689a08a', { age: 33 }, { new: true }).then((user)=>{
    console.log(user)
    return User.countDocuments({ age: 33 }) // counts amount of users with the age of 33
}).then((result)=> {
    console.log(result)
}).catch((e)=>{
    console.log(e)
})