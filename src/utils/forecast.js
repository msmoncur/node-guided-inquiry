const request = require('request')

const forecast = (latitude, longitude, unit, callback) => {
    //setting the units based on selection
    const units = unit === 'Celsius' ? 'm' : 'f'
    const url = 'http://api.weatherstack.com/current?access_key=75b6b7ef844d44e1897a326d7488d63f&query=' + latitude + ',' + longitude + '&units=' + units

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degress out. It feels like " + body.current.feelslike + " degress out. The humidity is " + body.current.humidity + "%.")
        }
    })
}

module.exports = forecast