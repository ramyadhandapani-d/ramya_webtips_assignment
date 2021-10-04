const timeZones = require('weather-forecast-ramya');
const { EventEmitter } = require('events');
const emitter = new EventEmitter();

// get all Time Zone details for every country
function getAllTimezones() {
  const allTimeZones = timeZones.allTimeZones();
  process.send(allTimeZones);
  process.exit();
}
// get time and data for a particular selected city
function getTimeForOneCity(city) {
  const timeForOneCity = timeZones.timeForOneCity(city);
  process.send(timeForOneCity);
  process.exit();
}
// get next N hours weather for a particular selected city
function getNextNhoursWeather(cityDTN, hours, weatherResult) {
  const nextNhoursWeather = timeZones.nextNhoursWeather(
    cityDTN,
    hours,
    weatherResult
  );
  process.send(nextNhoursWeather);
  process.exit();
}

// emiter functions for each getdata
emitter.on('allTimeZones', () => {
  getAllTimezones();
});
emitter.on('timeForOneCity', (data) => {
  getTimeForOneCity(data.cityName);
});
emitter.on('nextNhoursWeather', (data) => {
  getNextNhoursWeather(data.cityDTN, data.hours, data.weatherResult);
});


process.on('message', (data) => {
  emitter.emit(data.functionName, data);
});
