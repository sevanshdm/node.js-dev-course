const request = require('request')

const url = 'http://api.weatherstack.com/current?access_key=2cdb802e02f7591fca5984756a212582&query=37.8267,-122.4233&units=f'

request({ url: url, json: true }, (error, response) => {
    //console.log(response.body.current)
    const temperature = response.body.current.temperature
    const feelsLike = response.body.current.feelslike
    const weatherDescription = response.body.current.weather_descriptions[0]
    console.log(`${weatherDescription}. It is currently ${temperature} degrees out. It feels like ${feelsLike} degrees out.`)
})

