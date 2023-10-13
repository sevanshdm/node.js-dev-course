const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid.') 
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value){
            if(value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number.')
            }
        }
    }
})

//      pre is for doing something before an event, .post would be for after an event.
userSchema.pre('save', async function(next) { // pre(name of event, function to run*must be a standard function*)
    const user = this               
    
    // If user updates password, hash it.
    if(user.isModified('password')) {   //thing to hash, number of rounds to hash it.
        user.password = await bcrypt.hash(user.password, 8)
    }

    // call next when your done. if next is never called, the code runs forever.
    next()
})

                                // if you put in an object as the second argument, mongoose converts it into a schema
const User = mongoose.model('User', userSchema)

// const me = new User({
//     name: '  Shrek  ',
//     email: 'SHREKISLYFE@MEAD.IO   ',
//     password: '     asdfgy6redf5  '
// })

// me.save().then((me) => {
//     console.log(me)
// }).catch((error) => {
//     console.log('Error', error)
// })

module.exports = User