const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibW9yZ2FubTExIiwiYSI6ImNtNGgwa2dkaTAxdDMya3E5emhrMDlkNWsifQ.cKIi0F9y-knFiyDtR55lRg&limit=1'

    request({url: url, json: true }, (error, {body}) => {
        if(error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0){
            callback('Unablee to find location.Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1], 
                longitude: body.features[0].center[0], 
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode