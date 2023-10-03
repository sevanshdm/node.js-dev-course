const fs = require('node:fs'); // Loads in the file system module('fs) and stores it on fs variable.

// writeFileSync writes data to a file. It can create a file and fill it as well.
//fs.writeFileSync('notes.txt', 'My name is Shrek.')

fs.appendFileSync('notes.txt', ' Get out of my swamp!')