const request = require('supertest')
const app = require('../src/app')

test('Should signup a new user', async()=>{
    (await request(app).post('/users')).send({
        nane: 'Donkey',
        email: 'dornkey@example.com',
        password: 'MyPass777!'
    }).expect(201)
})

// Deletes everything in the testing Database so that you don't run into any errors with duplicates.

// This prevents the "A worker process has failed to exit gracefully and has been force exited" error
const mongoose = require('mongoose')
afterAll(() => {
    mongoose.connection.close();
})