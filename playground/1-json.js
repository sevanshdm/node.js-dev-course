const fs = require('fs')

// const book = {
//     title: 'Ego is the Enemy',
//     author: 'Ryan Holiday'
// }

// const bookJSON = JSON.stringify(book) // converts data to json data
//  fs.writeFileSync('1-json.json', bookJSON)

// const dataBuffer = fs.readFileSync('1-json.json') //read data
// const dataJSON = dataBuffer.toString()  // convert to standard string in js
// const data = JSON.parse(dataJSON)   // parsed data into an object 

// console.log(data.title)


const dataBuffer = fs.readFileSync('1-json.json')
const dataJSON = dataBuffer.toString()
const user = JSON.parse(dataJSON)

user.name = 'Shrek' // change name from json data
user.age = 33       // change age from jason data

const userJson = JSON.stringify(user) // convert data back into JSON
fs.writeFileSync('1-json.json', userJson) // override old file data with newly created data