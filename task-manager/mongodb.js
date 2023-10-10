// CRUD create read update delete

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient // An object, gives access to function necessary to connect to database so you can perform CRUD ops.

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
      return console.log('Unable to connect to database.')
    } 

    const db = client.db(databaseName)

    db.collection('users').insertOne({ //inserts a simple document into the users collection
        name: 'Shrek',
        age: '33'
    })
})