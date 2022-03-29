const request = require('request')
const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.weatherapi.com/v1/current.json?key=64aad52d14844e908e950447221703&q=' + latitude + ',' + longitude + '&aqi=no'

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather API', undefined)
        } else if (response.body.error) {
            callback('Could not find location', undefined)
        } else {
            callback(undefined, 'It is currently ' + response.body.current.temp_c + ' degree celsius out. And it will be ' + response.body.current.condition.text + '.')
        }callback
    })
}

module.exports = forecast