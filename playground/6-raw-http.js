const http = require('https')

const url = 'http://api.weatherstack.com/current?access_key=2cdb802e02f7591fca5984756a212582&query=45,-75&units=f'

const request = http.request(url,(response) => {
    let data = ''
    
    response.on('data', (chunk) => {
        data = data + chunk.toString()
    })

    response.on('end', () => {
        const body = JSON.parse(data)
        console.log(body)
    })
})

request.on('error', (error) => {
    console.log('An error', error)
})

request.end()