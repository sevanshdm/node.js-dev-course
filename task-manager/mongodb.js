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
                                                
    // db.collection('users').updateOne({
    //     _id: new ObjectId("6525a834a3d7c4b287325a71"),
    // }, {
    //     $inc: {
    //         age: 1
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // db.collection('users').deleteMany({
    //     age: 41
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    db.collection('tasks').deleteOne({
        description: "Clean the house" 
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
})