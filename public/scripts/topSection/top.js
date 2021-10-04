import { getDateAndTime } from '../utilities.js';
import { getParameters } from '../utilities.js';
import { timeCity } from '../weatherInfo/api.js';
const oneHourInSec = 3600000;
const cityDropDown = document.getElementById('city-list-menu');
const cityIcon = document.getElementById('city-icon');
const dateTime = document.getElementById('date-time').querySelectorAll('div');
const topParameters = document
  .getElementById('parameters')
  .querySelectorAll('h1');
const timeLineTime = document
  .getElementById('timeLineTime')
  .querySelectorAll('div');
const timeLineTemp = document
  .getElementById('timeLineTemp')
  .querySelectorAll('div');
const timeLineIcon = document
  .getElementById('timeLineIcon')
  .querySelectorAll('img');

// To update the date and time and also the AM,PM state icon with respect to the selected option .
const updateDateTime = function (
  dateTime,
  livedate,
  meridiem,
  hour,
  minute,
  sec
) {
  const [time, date] = dateTime;
  time.innerHTML = `${hour}:${minute}:<small>${sec}</small>
  <img class="amState" src="../assets/${meridiem.toLowerCase()}State.svg" alt="${meridiem}"</img>`;
  date.innerHTML = livedate;
};

// To update the parameters like temperature and humidity with respect to the selected option .
const updateParameters = function (city, topParameters, weatherData) {
  const [temperature, humidity, fahrenheit, precipitation] = topParameters;
  const [tempData, humData, fahrenData, precData] = getParameters(
    city,
    weatherData
  );
  temperature.innerHTML = tempData;
  humidity.innerHTML = humData;
  fahrenheit.innerHTML = fahrenData;
  precipitation.innerHTML = precData;
};

// Code block to update time in the timeline bar
const updateTimeLineTime = function (timeLineTime, meridiem, hour) {
  timeLineTime[0].innerText = 'NOW';
  for (let i = 1; i < 5; i++) {
    let x = parseInt(hour) + i;
    let y = meridiem;
    if (x > 12) {
      x = x - 12;
      y = meridiem == 'AM' ? 'PM' : 'AM';
    }
    timeLineTime[i].innerText = x + y;
  }
};

class citySelect {
  constructor(selectedCityName) {
    this.cityName = selectedCityName.cityName;
    this.dateAndTime = selectedCityName.dateAndTime;
    this.timeZone = selectedCityName.timeZone;
    this.temperature = selectedCityName.temperature;
    this.humidity = selectedCityName.humidity;
    this.precipitation = selectedCityName.precipitation;
  }
  // To update the icon of the city with respect to the selected option from drop down menu.
  updateIcon() {
    cityIcon.src = `../assets/Icons for cities/${this.cityName}.svg`;
  }
  // Code block to update temperature in the timeline bar
  updateTimeLineTemp(nextFiveTemp) {
    for (let i = 0; i < 5; i++) {
      timeLineTemp[i].innerText = parseInt(nextFiveTemp[i]);
    }
  }
  // Code block to update temperatureIcon in the timeline bar
  updateTimeLineIcon(nextFiveTemp) {
    for (let i = 0; i < 5; i++) {
      const value = parseInt(nextFiveTemp[i]);
      if (value < 18) {
        timeLineIcon[i].src = '../assets/Weather Icons/rainyIcon.svg';
      } else if (18 <= value && value <= 22) {
        timeLineIcon[i].src = '../assets/Weather Icons/windyIcon.svg';
      } else if (23 <= value && value <= 29) {
        timeLineIcon[i].src = '../assets/Weather Icons/cloudyIcon.svg';
      } else {
        timeLineIcon[i].src = '../assets/Weather Icons/sunnyIcon.svg';
      }
    }
  }
}

// To change the details with respect to the selected city from drop down menu.
export const updateCity = async function (weatherData) {
  const selectedCity = cityDropDown.value;
  const citySelectInherit = new citySelect(weatherData[selectedCity]);
  const [livedate, , , meridiem, hour, minute, sec] = getDateAndTime(
    selectedCity,
    weatherData
  );
  refreshTimeLine(citySelectInherit, weatherData, selectedCity);
  setInterval(() => {
    refreshTimeLine(citySelectInherit, weatherData, selectedCity);
  }, oneHourInSec);
  citySelectInherit.updateIcon();
  updateDateTime(dateTime, livedate, meridiem, hour, minute, sec);
  updateParameters(selectedCity, topParameters, weatherData);
  updateTimeLineTime(timeLineTime, meridiem, hour);
};
const refreshTimeLine = async function (
  citySelectInherit,
  weatherData,
  selectedCity
) {
  const nextFiveTemp = await timeCity(weatherData[selectedCity]['cityName']);
  citySelectInherit.updateTimeLineTemp(nextFiveTemp);
  citySelectInherit.updateTimeLineIcon(nextFiveTemp);
};

export const top = function (weatherData) {
  // To get list of cities from object
  for (const key in weatherData) {
    const option = document.createElement('option');
    option.value = key;
    option.text = weatherData[key]['cityName'];
    cityDropDown.add(option);
  }
  updateCity(weatherData);
  cityDropDown.addEventListener('change', function () {
    updateCity(weatherData);
  });
};
