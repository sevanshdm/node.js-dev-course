const chalk = require('chalk')
const getNotes = require('./notes.js')

                        // this arrays index would target the "add" input provided after the 2 default location args load.
const command = process.argv[2] // in the command line input "node app.js add". argv is an array of all the arguments provided.

console.log(process.argv) // after inputing "node app.js" you can add a space and then input more arguments such as "add"

if (command === 'add') { 
    console.log('Adding note!')
} else if (command ==='remove') {
    console.log('Removing note!')
}