const request = require('request')

// const url = 'http://api.weatherstack.com/current?access_key=2cdb802e02f7591fca5984756a212582&query=37.8267,-122.4233&units=f'
                    
                  //Parses it into JSON
// request({ url: url, json: true }, (error, response) => {

//     if (error) { //low level error handling (probs with os or no internet connection)
//         console.log('Unable to connect to weather service.')
//     } else if (response.body.error) { 
//         console.log('Unable to find location.')
//     }else {
//         const temperature = response.body.current.temperature
//         const feelsLike = response.body.current.feelslike
//         const weatherDescription = response.body.current.weather_descriptions[0]
//         console.log(`${weatherDescription}. It is currently ${temperature} degrees out. It feels like ${feelsLike} degrees out.`)
//     }
// })

// Geocoding 
// Address -> lat/long -> Weather 

const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/philadelphia.json?access_token=pk.eyJ1IjoiZXN0ZXBoZW0iLCJhIjoiY2xuYzdibHRoMGp6NzJscDl5ejJiNDltayJ9.l2hMB99xwdzGDvKgbXe5og&limit=1'

request({url: geocodeURL, json: true}, (error, response) => {
    if(error) {
        console.log('Unable to connect to location services.')
    } else if (response.body.features.length === 0) { // If there's no valid location, features becomes an empty array.
        console.log('Unable to find location. Try another search.')
    } else {
        const latitude = response.body.features[0].center[1]
        const longitude = response.body.features[0].center[0]
        console.log(latitude, longitude)
    }
})

