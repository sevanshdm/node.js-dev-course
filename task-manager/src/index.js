const express = require('express')
require('./db/mongoose') //import mongoose.js file
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000



const multer = require('multer')
const upload = multer({ //options object
    dest: 'images',
    limits: {
        fileSize: 1000000, // 1 mb
    },
    //             object  callback
    fileFilter(req, file, cb) { //function that runs when a new file is attempted to be uploaded.
        if(!file.originalname.match(/\.(doc|docx)$/)){ // this is a regular expression

              //(!file.originalname.endsWith('.pdf')) { // only accepts media files
            return cb(new Error('Please upload a Word document.'))      
        }   

        cb(undefined, true)

        // cb(new Error('File must be a PDF')) // error
        // cb(undefined, true) // if things go right
        // cb(undefined, false) // silently rejects file
    }
})


app.post('/upload', upload.single('upload'), (req, res) => { // route handler call
    res.send()
},(error, req, res, next)=>{ // this lets express know that this is the function set up to handle any uncaught errors.
    res.status(400).send({ error: error.message }) // correctly handles errors when something goes wrong.
})






// automatically parses incoming json into an object.
app.use(express.json())

// registers the router with the existing app.
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

// main()

// const jwt = require('jsonwebtoken')

// const myFunction = async() => {  
// //Token creation.      object with data to be embedded    The signature /A secret that signs the token, making sure it hasn't be altered or tampered with.
//     const token = jwt.sign({_id: 'abc123'}, 'thisismynewcourse', { expiresIn: '1 second'}) 
//     console.log(token)

//     // Verifies token
//     const data = jwt.verify(token, 'thisismynewcourse')
//     console.log(data)
// }

// myFunction()

// With encryption, you can get the original value back, you can't do that with hashing.