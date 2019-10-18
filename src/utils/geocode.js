const request = require('request');

const mapboxToken = 'pk.eyJ1IjoiY29ybmUtZGUtYnJ1aW4iLCJhIjoiY2sxZHdkZjZvMGJ2NTNscGQ2bndxa2JveSJ9.rjPZSWrYbrZspWJUQcg85w';
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=' + mapboxToken + '&language=nl&limit=1'

    request({ url: url, json: true }, (error, {body: {features}}) => {
        if(error) {
            callback('Unable to connect to location services!');
        } else if(features.length === 0) {
            callback('Unable to find location, try again with different search term.');
        } else {
            callback(undefined, {
                longitude: features[0].center[0],
                latitude: features[0].center[1],
                location: features[0].place_name
            });
        }
    });
}

module.exports = geocode;