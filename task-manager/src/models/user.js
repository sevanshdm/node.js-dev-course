const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true, 
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
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})
            // method we created, is accessible on instances. sometimes called instance medthods.
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() },'thisismynewcourse')

    user.tokens = user.tokens.concat({ token }) // adds the token created above to the array of tokens in the model(tokens).
    await user.save()
    return token
}

// static methods are accessible on the model, sometimes called model methods
userSchema.statics.findByCredentials = async (email, password) =>{
    const user = await User.findOne({ email })

    if(!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

// hash plain text password, pre is for doing something before an event, .post would be for after an event.
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