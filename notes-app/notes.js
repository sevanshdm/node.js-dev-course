const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    //const duplicateNotes = notes.filter((note) => note.title === title) // will continue to search through array even after finding a match.
    const duplicateNote = notes.find((note) => note.title === title) // stops at first match found.

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added.'))
    } else {
        console.log(chalk.red.inverse('Note title taken.'))
    }
}

const removeNote =(title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title != title)

    if(notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Note removed'))
        saveNotes(notesToKeep)
    } else {
        console.log(chalk.red.inverse('No note found'))
    }
}

const listNotes = () => {
    const notes = loadNotes()

    console.log(chalk.inverse('Your notes'))

    notes.forEach((note) => {
        console.log(note.title)
    })
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)

    if (note) {
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.red.inverse('Note not found'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e){
        return [] // if no data exists, this creates an empty array to be filled later.
    }
}

module.exports = { // sets return values of this file as an object to be used when called by another file with require()
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
} 