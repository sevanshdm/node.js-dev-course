const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

                //good practice to have an error and response option
geocode('Boston', (error, data) => {
    console.log('Error', error)
    console.log('Data', data)
})

forecast(37.775, -122.418, (error, data) => {
    console.log('Error', error)
    console.log('Data', data)
  })