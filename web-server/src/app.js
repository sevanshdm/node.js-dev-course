const path = require('path')
const express = require('express')
const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates')

// Setup handlebars engine and views location
app.set('views', viewsPath) //That'll make sure it always uses the correct views folder no matter where you run the project from.
app.set('view engine', 'hbs') // hbs is handlebars

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// index template
app.get('', (req, res) => {
            //index.hbs from the views folder
    res.render('index',{
        title: 'Weather',
        name: 'Shrek Swampington'
    }) // I've configured to express to use view engine "hbs", so render will be able to render .hbs templates.
})

// app.com/about template
app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Shrek Swampington'
    })
})

// app.com/help
app.get('/help', (req,res) => {
    res.render('help', {
        helpText: 'This is some helpful text.'
    })
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