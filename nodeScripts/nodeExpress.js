const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const { fork } = require('child_process');
var weatherResult = [];
const childProcessPath = './nodeScripts/childProcess.js';
app.use(express.static('public'));
app.use(express.json());
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
  })
);

//send all cities timeZone
app.get('/all-timezone-cities', (req, res) => {
  const child = fork(childProcessPath);
  child.send({ functionName: 'allTimeZones' });
  child.on('message', (data) => {
    weatherResult = data;
    res.json(data);
  });
});

// send  a city time to get city time date & name
app.get('/city', (req, res) => {
  const city = req.query.city;
  if (city) {
    const child = fork(childProcessPath);
    child.send({ functionName: 'timeForOneCity', cityName: city });
    child.on('message', (data) => {
      res.json(data);
    });
  } else {
    res
      .status(404)
      .json({ Error: 'Not a Valid EndPoint.Please check API Doc' });
  }
});

// send hourly forecast for one city
app.post('/hourly-forecast', (req, res) => {
  const cityDTN = req.body.city_Date_Time_Name;
  const hours = req.body.hours;
  const child = fork(childProcessPath);
  child.send({ functionName: 'allTimeZones' });
  child.on('message', (data) => {
    weatherResult = data;
  });
  if (cityDTN && hours) {
    const child = fork(childProcessPath);
    child.send({
      functionName: 'nextNhoursWeather',
      cityDTN: cityDTN,
      hours: hours,
      weatherResult: weatherResult,
    });
    child.on('message', (data) => {
      res.json(data);
    });
  } else {
    res
      .status(404)
      .json({ Error: 'Not a valid EndPoint. Please Check API Doc' });
  }
});
app.listen(8000);
