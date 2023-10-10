// CRUD create read update delete

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient // An object, gives access to function necessary to connect to database so you can perform CRUD ops.
// const ObjectID = mongodb.ObjectId

// destructured version of above code
const { MongoClient, ObjectId } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017' //default mongodb
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
      return console.log('Unable to connect to database.')
    } 

    const db = client.db(databaseName)
                                                // id is binary, that's why new ObjectId had to be used
    db.collection('users').findOne({_id: new ObjectId('652595cdda5f9a0a18e5d3c6')},(error, user) => {
        if (error) {
            return console.log('Unable to fetch')
        }

        console.log(user)
    })

    // Finds and displays users with age of 127
    db.collection('users').find({ age: 127 }).toArray((error, users) => {
        console.log(users)
    })

    // finds the amount of users with age of 127(count is deprecated)
    // db.collection('users').find({ age: 127 }).count((error, count) => {
    //     console.log(count)
    // })

    db.collection('tasks').findOne({_id: new ObjectId('6525997b62efe327c616ba7f')}, (error, task) => {
        console.log(task)
    })

    db.collection('tasks').find({ completed: false}).toArray((error, tasks) => {
        console.log(tasks)
    })

})