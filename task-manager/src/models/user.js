const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

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
    }],
    avatar: {
        type: Buffer // this allow you to store the buffer with the binary img data in the database alongside of the user who the img belongs to.
    }
}, { // Schema options
    timestamps: true
})

// Virtual Property: Is not actual data stored in the database, it's a relationship between two entities (user and task)
            //name of virt field
userSchema.virtual('tasks', { // configure individual fields
    ref: 'Task',
    localField: '_id', // where the local data is stored(user*here*)
    foreignField: 'owner' // name of the field on the other thing (task)
})

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject() // gives just the raw profile data

    delete userObject.password
    delete userObject.tokens

    return userObject
}

            // method we created, is accessible on instances. sometimes called instance methods.
userSchema.methods.generateAuthToken = async function () {
    const user = this       
    const token = jwt.sign({ _id: user._id.toString() },'thisismynewcourse') // creates token

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

// Delete user tasks when user is removed
userSchema.pre('deleteOne', {document: true, query: false }, async function (next) {
    const user = this
    try{
        await Task.deleteMany({ owner: user._id})

        next()
    }catch(e){
        console.log(e)
    }

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