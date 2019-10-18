const request = require('request');

const createForecastMessage = ({ currently, daily }) => {
    const currentTemperature = currently.temperature;
    const rainChange = currently.precipProbability * 100;
    const dailySummary = daily.data[0].summary;
    const dailyHigh = daily.data[0].temperatureHigh;
    const dailyLow = daily.data[0].temperatureLow;
    return dailySummary +
        ' Op dit moment is het ' +
        currentTemperature +
        ' graden. Er is ' +
        rainChange + '%' +
        ' kans op regen. ' +
        'Vandaag wordt het maximaal ' +
        dailyHigh +
        ' graden en minimaal ' +
        dailyLow +
        ' graden.';

}

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/f4011266627fe3887c334d5bba110351/' + latitude + ',' + longitude + '?lang=nl&units=si'

    request({ url: url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service');
        } else if(body.error) {
            callback('Unable to find location');
        } else {
            callback(undefined, createForecastMessage(body));
        }
    });
}

module.exports = forecast;