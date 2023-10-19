// this file contains all the code necessary to set up the database for test data.

const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/user')

// Jest setup and teardown
// Jest lifecycle methods, runs some code just before or after a test case. That will allow you set up some code that clears the database so that your test cases consistently execute as expected.

//mongoose will create an id
const userOneId = new mongoose.Types.ObjectId()

const userOne = {
    _id: userOneId,
    name: 'Gingy',
    email: 'cookieman@example.com',
    password: '56what!!',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET) // creates a new json web token
    }]
}

const setupDatabase = async () =>{
    await User.deleteMany()

    await new User(userOne).save() // creates a user to test with after all the previous ones were deleted.
}

module.exports = {
    userOneId,
    userOne,
    setupDatabase
}