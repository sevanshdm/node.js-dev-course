// CRUD create read update delete

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient // An object, gives access to function necessary to connect to database so you can perform CRUD ops.
// const ObjectID = mongodb.ObjectId

// destructured version of above code
const { MongoClient, ObjectId } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const id = new ObjectId() // Generate your own id's from the file
console.log(id)

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
      return console.log('Unable to connect to database.')
    } 

    const db = client.db(databaseName)

    // db.collection('users').insertOne({ //inserts a simple document into the users collection
    //     name: 'Henry',
    //     age: '67'
    // }, (error, results) => {
    //     if(error) {
    //         return console.log('Unable to insert user.')
    //     }

    //     console.log(results.insertedId)
    // })
    
    // db.collection('users').insertMany([
    //     {
    //         name: 'Donkey',
    //         age: '36'
    //     }, {
    //         name: 'Gingy',
    //         age: '127'
    //     }
    // ], (error, result) => {
    //     if(error) {
    //         return console.log('Unable to insert userts.')
    //     }

    //     console.log(result.insertedIds)
    // })

    // db.collection('tasks').insertMany([{
    //     description: 'Clean the house',
    //     completed: true
    // },{
    //     description: 'Renew inspection',
    //     completed: false
    // },{
    //     description: 'Pot plants',
    //     completed: false
    // }], (error, result) => {
    //     if(error) {
    //         return console.log('Unable to insert tasks.')
    //     }

    //     console.log(result.insertedIds)
    // })
})