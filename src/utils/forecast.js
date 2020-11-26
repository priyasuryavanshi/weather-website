const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d19648592e7b908eb7f2d3ca7e87a402&query='+ latitude + ',' + longitude

    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to location services!', undefined)
        } else if(body.error) {
            callback('Wrong input entered', undefined)
        } else {
            callback(undefined, 'It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + 
            ' degrees. The humidity is ' + body.current.humidity + '%. Wind speed is ' + body.current.wind_speed + ' Km/hour. It is ' +
            body.current.weather_descriptions[0] + ' today.'  )
        }
    })
}

// forecast(-75.7088, 44.1545, (error, data) => {
//     console.log('Error', error)
//     console.log('Data', data)
//   }) 

module.exports = forecast