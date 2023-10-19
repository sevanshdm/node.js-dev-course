const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../src/app')
const Task = require('../src/models/task')
const {
    userOneId, 
    userTwoId,
    userOne, 
    userTwo,
    taskOne,
    taskTwo,
    taskThree,
    setupDatabase,
} = require('./fixtures/db')

// runs before each test case in this test suite and deletes all the users in the testing Database so that you don't run into any errors with duplicates.
beforeEach(setupDatabase)

test('Should create task for user', async ()=>{
    const response = await request(app)
        .post('/tasks')                  // first token, JWT off the object
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'From my test'
        })
        .expect(201)
    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toBe(false)
}) 

test('Should fetch user tasks', async ()=>{
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    expect(response.body.length).toEqual(2)
})

test('Should not delete other users tasks', async ()=>{
    const response = await request(app)
        .delete(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(404)
    const task = await Task.findById(taskOne._id)
    expect(task).not.toBeNull()
})

// This prevents the "A worker process has failed to exit gracefully and has been force exited" error
afterAll(() => {
    mongoose.connection.close();
})