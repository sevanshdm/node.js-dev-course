const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const app = require('../src/app')
const User = require('../src/models/user')

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

test('Should get profile for user', async()=>{
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`) //set authorization header 
        .send()
        .expect(200)
})

test('Should not get profile for unauthenticated user', async()=>{
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('Should delete account for user', async()=>{
    await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
    
})

test('Should not delete account for unauthenticated user', async()=>{
    await request(app)
    .delete('/users/me')
    .send()
    .expect(401)
})

// This prevents the "A worker process has failed to exit gracefully and has been force exited" error
afterAll(() => {
    mongoose.connection.close();
})