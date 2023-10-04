const request = require('request')

const url = 'http://api.weatherstack.com/current?access_key=2cdb802e02f7591fca5984756a212582&query=37.8267,-122.4233'

request({ url: url }, (error, response) => {
    const data = JSON.parse(response.body)
    console.log(data.current)
})