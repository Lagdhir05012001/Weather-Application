const request = require('request')
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoieWFzaGRlc2FpIiwiYSI6ImNsMTBiNDZzdDB5d2gzcW8weTJqejRqemoifQ.JvmodLdphYHLcOUry-7RHw'

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location service', undefined)
        } else if (response.body.features.length === 0) {
            callback('Could not access the location. try another search', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode