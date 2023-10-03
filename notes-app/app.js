const chalk = require('chalk')
const yargs = require('yargs')
const getNotes = require('./notes.js')

// Customize yargs version
yargs.version('1.1.0')

// Create add command, you can see what options there are using "filename.js --help"
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    handler: function () { // This is the code that runs when someone selects remove
        console.log('Adding a new note!')
    }
})

// Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    handler: function () { 
        console.log('Removing the note')
    }
})

// Create list command
yargs.command({
    command: 'list',
    describe: 'List your notes',
    handler: function () {
        console.log('Listing out all notes')
    }
})

// Create read command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    handler: function () {
        console.log('Reading a note')
    }
})

// in the command line input "node app.js stuff". This would add the inputed "stuff" after the 2 default location args.
        // Was process.argv, argv is an array of all the arguments provided.
console.log(yargs.argv) // after inputing "node app.js" you can add a space and then input more arguments such as "add"
