const http = require('http');
const url = require('url');
const timeZones = require('weather-forecast-ramya');
var weatherResult = [];
const responseHeader = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

const handleAllTimeZone = function (res) {
  weatherResult = timeZones.allTimeZones();
  res.end(JSON.stringify(weatherResult));
};
const handleTimeforOneCity = function (reqUrl, res){
  const city = reqUrl.query.city;
  if (city) {
    const cityDateTime = JSON.stringify(timeZones.timeForOneCity(city));
    res.end(cityDateTime);
  } else {
    res
      .status(404)
      .end(
        JSON.stringify({ Error: 'Not a Valid EndPoint.Please check API Doc' })
      );
  }
};
const handlenextNhoursWeather = function (req, res) {
  let data = '';
  req.on('data', (chunk) => {
    data += chunk;
  });
  req.on('end', () => {
    const reqBody = JSON.parse(data);
    const cityDTN = reqBody.city_Date_Time_Name;
    const hours = reqBody.hours;
    weatherResult = timeZones.allTimeZones();
    if (cityDTN && hours) {
      res.end(
        JSON.stringify(
          timeZones.nextNhoursWeather(cityDTN, hours, weatherResult)
        )
      );
    } else {
      res.status(404).end(
        JSON.stringify({
          Error: 'Not a valid EndPoint. Please Check API Doc',
        })
      );
    }
    res.end();
  });
};

const requestManager = function (request, response) {
  response.writeHead(200, responseHeader);
  const reqUrl = url.parse(request.url, true);
  const endPoint = reqUrl.pathname;
  if (endPoint === '/all-timezone-cities') {
    handleAllTimeZone(response);
  }
  if (endPoint === '/city') {
    handleTimeforOneCity(reqUrl, response);
  }
  if (endPoint === '/hourly-forecast') {
    handlenextNhoursWeather(request, response);
  }
};
const server = http.createServer(requestManager);
// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(8000);
