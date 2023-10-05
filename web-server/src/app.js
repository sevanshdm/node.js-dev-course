const express = require('express')

const app = express()

// app.com
      //route, function of what to do 
app.get('', (req, res) => {
    res.send('<h1>Weather</h1>')
})

// app.com/help
app.get('/help', (req, res) => {
    res.send([{
        name: 'Shrek'
    }, {
        name: 'Donkey'
    }])
})

// app.com/about
app.get('/about', (req, res) => {
    res.send('<h1>About Page</h1>')
})

// app.com/weather
app.get('/weather', (req, res) => {
    res.send({
        forecast: 'Nasty',
        location: 'Thee Swamp'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})