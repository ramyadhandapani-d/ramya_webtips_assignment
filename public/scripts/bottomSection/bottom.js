import {
  sortContinent,
  sortTempAscend,
  sortTempDescend,
} from '../utilities.js';
import { getDateAndTime } from '../utilities.js';
const arrow = document.getElementById('arrow').querySelectorAll('img');
const bottomBar = document.getElementById('bottomBar');
let toggleName = true;
let toggleTemperature = false;

// Updating the Continent name and cityName inside the card
const updateCityName = function (data, key) {
  const innerDivOne = document.createElement('div');
  innerDivOne.className = 'bottom-card-city';
  const continentName = document.createElement('h3');
  const [nameContinent] = data[key]['timeZone'].split('/');
  continentName.append(document.createTextNode(nameContinent));
  const cityName = document.createTextNode(data[key]['cityName']);
  const [, , , meridiem, hour, minute] = getDateAndTime(key, data);
  const time = document.createTextNode(`${hour}:${minute} ${meridiem}`);
  innerDivOne.append(continentName, cityName, ',', time);
  return innerDivOne;
};

// Updating the temperature and humidity inside the card
const updateCityTemp = function (data, key) {
  const innerDivTwo = document.createElement('div');
  innerDivTwo.className = 'bottom-card-temp';
  const temperature = document.createElement('h3');
  temperature.append(document.createTextNode(data[key]['temperature']));
  const humidityIcon = document.createElement('img');
  humidityIcon.alt = 'weather_icon';
  humidityIcon.className = 'weather-icon';
  humidityIcon.src = '../assets/Weather Icons/humidityIcon.svg';
  innerDivTwo.append(temperature, humidityIcon, data[key]['humidity']);
  return innerDivTwo;
};

// Updating the cards in the bottom section
const updateBottomCard = function (data, sortOrder, bottom) {
  let i = 0;
  bottom.innerHTML = '';
  for (const key of sortOrder) {
    if (i < 12) {
      const bottomCardCity = updateCityName(data, key);
      const bottomCardTemp = updateCityTemp(data, key);
      const divBlock = document.createElement('div');
      divBlock.className = 'bottom-card';
      divBlock.append(bottomCardCity, bottomCardTemp);
      bottom.append(divBlock);
    }
    i++;
  }
};
//Sorting temperature in both direction when continent is in Descending order
const continentDescendSort = function (
  data,
  toggleTemperature,
  continentDescend,
  bottom
) {
  if (toggleTemperature) {
    const tempSortDescend = sortTempDescend(data, continentDescend);
    updateBottomCard(data, tempSortDescend, bottom);
  } else {
    const tempSortAscend = sortTempAscend(data, continentDescend);
    updateBottomCard(data, tempSortAscend, bottom);
  }
};

//Sorting temperature in both direction when continent is in Ascending order
const continentAscendSort = function (
  data,
  toggleTemperature,
  continentAscend,
  bottom
) {
  if (toggleTemperature) {
    const tempSortDescend = sortTempDescend(data, continentAscend);
    updateBottomCard(data, tempSortDescend, bottom);
  } else {
    const tempSortAscend = sortTempAscend(data, continentAscend);
    updateBottomCard(data, tempSortAscend, bottom);
  }
};
//Sorting both Name and temperature on click
const sortNameTemp = function (
  data,
  toggleName,
  toggleTemperature,
  continentOrder,
  bottom
) {
  const [continentAscend, continentDescend] = continentOrder;
  if (toggleName) {
    continentDescendSort(data, toggleTemperature, continentDescend, bottom);
  } else {
    continentAscendSort(data, toggleTemperature, continentAscend, bottom);
  }
};

//Updating the arrow for continent Name sorting
const updateNameArrow = function (data, continentOrder, bottom, arrow) {
  if (toggleName) {
    arrow.src = '../assets/arrowDown.svg';
  } else {
    arrow.src = '../assets/arrowUp.svg';
  }
  toggleName = !toggleName;
  sortNameTemp(data, toggleName, toggleTemperature, continentOrder, bottom);
};

//Updating the arrow for temperature sorting
const updatetemperatureArrow = function (data, continentOrder, bottom, arrow) {
  if (toggleTemperature) {
    arrow.src = '../assets/arrowDown.svg';
  } else {
    arrow.src = '../assets/arrowUp.svg';
  }
  toggleTemperature = !toggleTemperature;
  sortNameTemp(data, toggleName, toggleTemperature, continentOrder, bottom);
};

export const bottom = function (data) {
  const [nameArrow, temperatureArrow] = arrow;
  let continentOrder = sortContinent(data);
  setInterval(()=>{continentOrder=sortContinent(data)},14400000);
  updateNameArrow(data, continentOrder, bottomBar, nameArrow);
  updatetemperatureArrow(data, continentOrder, bottomBar, temperatureArrow);
  nameArrow.addEventListener('click', function () {
    updateNameArrow(data, continentOrder, bottomBar, nameArrow);
  });
  temperatureArrow.addEventListener('click', function () {
    updatetemperatureArrow(data, continentOrder, bottomBar, temperatureArrow);
  });
}
