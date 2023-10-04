const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js') // imports notes.js 

// Customize yargs version
yargs.version('1.1.0')

// in the command line input "node app.js stuff". This would add the inputed "stuff" after the 2 default location args.
// after inputing "node app.js" you can add a space and then input more arguments such as "add"

// Create add command, you can see what options there are using "filename.js --help"
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: { // Defines all the options you want this given command to support.
        title: { // ex. node app.js add --title='My Title'
            describe: 'Note title', 
            demandOption: true,  // Would require that the title option is inputed if the "add" command is selected.
            type: 'string' // requires that a string is inputed, or will create an empty string if one isn't.
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) { // This is the code that runs when someone selects the command
        notes.addNote(argv.title, argv.body)
    }
})

// Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demand: true,
            type: 'string'
        }
    },

    handler: function (argv) { 
        notes.removeNote(argv.title)
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


        // Was process.argv, argv is an array of all the arguments provided.
//console.log(yargs.argv) // This line of code is needed in order for yargs to know when and how to parse its arguments.
yargs.parse() // An alternative way to the one above, this one isn't as optimal, it doesn't take any arguments.