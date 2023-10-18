const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')

const userOne = {
    name: 'Gingy',
    email: 'cookieman@example.com',
    password: '56what!!'
}

// Jest setup and teardown
// Jest lifecycle methods, runs some code just before or after a test case. That will allow you set up some code that clears the database so that your test cases consistently execute as expected.

// runs before each test case in this test suite and deletes all the users in the testing Database so that you don't run into any errors with duplicates.
beforeEach(async()=>{
    await User.deleteMany()

    await new User(userOne).save() // creates a user to test with after all the previous ones were deleted.
})

// runs after each test case in this test suite.
// afterEach(()=>{

// })

test('Should signup a new user', async()=>{
    await request(app).post('/users').send({
        name: 'Donkey',
        email: 'dornkey@example.com',
        password: 'MyPass777!'
    }).expect(201)
})

test('Should log in existing user', async()=>{
    (await request(app).post('/users/login')).send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
})

test('Should not login nonexistent user', async()=>{
    (await request(app).post('/users/login')).send({
        email: userOne.email,
        password: 'thisisnotmypass'
    }).expect(400)
})

// This prevents the "A worker process has failed to exit gracefully and has been force exited" error
const mongoose = require('mongoose')
afterAll(() => {
    mongoose.connection.close();
})