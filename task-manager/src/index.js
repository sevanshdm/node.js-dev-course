const app = require('./app')

const port = process.env.PORT // was process.env.PORT || 3000 //environment variable value for port when it runs locally on your machine found in config folder, dev.env file.

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