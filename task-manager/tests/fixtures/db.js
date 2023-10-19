// this file contains all the code necessary to set up the database for test data.

const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/user')
const Task = require('../../src/models/task')

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

const userTwoId = new mongoose.Types.ObjectId()

const userTwo = {
    _id: userTwoId,
    name: 'Bongo',
    email: 'bigbacon@example.com',
    password: '56what!!',
    tokens: [{
        token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET) // creates a new json web token
    }]
}

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: 'First task',
    completed: false,
    owner: userOne._id
}

const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Second task',
    completed: true,
    owner: userOne._id
}

const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Third task',
    completed: true,
    owner: userTwo._id
}

const setupDatabase = async () =>{
    await User.deleteMany()
    await Task.deleteMany()

    await new User(userOne).save() // creates a user to test with after all the previous ones were deleted.
    await new User(userTwo).save()

    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()
}

module.exports = {
    userOneId,
    userTwoId,
    userOne,
    userTwo,
    taskOne,
    taskTwo,
    taskThree,
    setupDatabase
}

// This prevents the "A worker process has failed to exit gracefully and has been force exited" error
afterAll(() => {
    mongoose.connection.close();
})