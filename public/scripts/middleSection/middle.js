import { getDateAndTime, temperatureCategory } from '../utilities.js';

const cityCard = document.getElementById('cityCard');
const spinner = document.getElementById('spinner');
const [sunIcon, coldIcon, rainIcon] = document
  .getElementById('preferenceIcon')
  .querySelectorAll('img');
let cardNum = 5;
let selectedIcon;
let selectedList;
let selectedImageName;

const next = function () {
  cityCard.scrollLeft += 300;
};
const previous = function () {
  cityCard.scrollLeft -= 300;
};
const updateSpinner = function (weatherData) {
  cardNum = spinner.value;
  cardUpdate(
    selectedIcon,
    selectedList,
    selectedImageName,
    cityCard,
    weatherData,
    cardNum
  );
};
const prefer = function (prefIcon, prefList, iconName, weatherData) {
  cityCard.scrollLeft = 0;
  selectedIcon = prefIcon;
  selectedList = prefList;
  selectedImageName = iconName;
  cardUpdate(
    selectedIcon,
    selectedList,
    selectedImageName,
    cityCard,
    weatherData,
    cardNum
  );
};
const updateCardCityName = function (
  cityKey,
  cityData,
  cardCityName,
  weatherData
) {
  const [livedate, , , meridiem, hour, minute] = getDateAndTime(
    cityKey,
    weatherData
  );
  for (let j = 0; j < 3; j++) {
    const innerChild = document.createElement('div');
    cardCityName.append(innerChild);
  }
  const [nameNow, timeNow, dateNow] = cardCityName.childNodes;
  nameNow.append(document.createTextNode(cityData['cityName']));
  timeNow.append(document.createTextNode(`${hour}:${minute} ${meridiem}`));
  dateNow.append(document.createTextNode(livedate));
};

const updateCardTemp = function (cardTemp, cityData, icon) {
  const temperatureImage = document.createElement('img');
  temperatureImage.alt = 'weather_icon';
  temperatureImage.className = 'weather-icon';
  temperatureImage.src = `../assets/Weather Icons/${icon}.svg`;
  cardTemp.append(temperatureImage, ' ', cityData['temperature']);
};
const updateCardHumidity = function (cardHum, cityData) {
  for (let j = 0; j < 2; j++) {
    const innerChild = document.createElement('div');
    cardHum.append(innerChild);
  }
  const [cardHumidity, cardPrecipitation] = cardHum.childNodes;
  const humidityIcon = document.createElement('img');
  humidityIcon.alt = 'weather_icon';
  humidityIcon.className = 'weather-icon';
  humidityIcon.src = '../assets/Weather Icons/humidityIcon.svg';
  cardHumidity.append(humidityIcon, ' ', cityData['humidity']);

  const precipitationIcon = document.createElement('img');
  precipitationIcon.alt = 'weather_icon';
  precipitationIcon.className = 'weather-icon';
  precipitationIcon.src = '../assets/Weather Icons/precipitationIcon.svg';
  cardPrecipitation.append(precipitationIcon, ' ', cityData['precipitation']);
  cardHum.append(cardHumidity, cardPrecipitation);
};

const updateCardImage = function (cardImg, cityKey) {
  let cityImage = document.createElement('img');
  cityImage.alt = 'city_icon';
  cityImage.className = 'middle-img';
  cityImage.src = `../assets/Icons for cities/${cityKey}.svg`;
  cardImg.append(cityImage);
};
const highlight = function (addBar) {
  sunIcon.style.borderBottom = '0';
  coldIcon.style.borderBottom = '0';
  rainIcon.style.borderBottom = '0';
  addBar.style.borderBottom = '2px solid lightblue';
};
const cardUpdate = function (
  addBar,
  sortList,
  icon,
  parent,
  weatherData,
  spinVal
) {
  highlight(addBar);
  parent.innerHTML = ''; // removing all the card element to add new.

  // adding new card elements
  for (const [cityKey, cityData] of sortList) {
    if (parent.childElementCount < spinVal) {
      const divBlock = document.createElement('div');
      divBlock.id = 'container';
      divBlock.className = 'container';
      for (let j = 0; j < 4; j++) {
        const innerChild = document.createElement('div');
        divBlock.append(innerChild);
      }
      const [cardCityName, cardTemp, cardHum, cardImg] = divBlock.childNodes;
      updateCardCityName(cityKey, cityData, cardCityName, weatherData); // Updating top left portion.
      updateCardTemp(cardTemp, cityData, icon); // Updating right top portion.
      updateCardHumidity(cardHum, cityData); // Updating left bottom portion.
      updateCardImage(cardImg, cityKey); // Updating city icon
      parent.append(divBlock);
    }
  }
};
export const middle = function (weatherData) {
  // Adding event listerners to the next and previous button to make the layout scrollable .
  document.getElementById('next').addEventListener('click', next);
  document.getElementById('previous').addEventListener('click', previous);

  //Sorting data based on weather
  const [sunny, rainy, cold] = temperatureCategory(weatherData);

  //To set the default card preference
  prefer(coldIcon, cold, 'snowflakeIcon', weatherData);

  //Adding event listener to spinner.
  spinner.addEventListener('click', function () {
    updateSpinner(weatherData);
  });

  // Adding event listerners to preference Icon
  sunIcon.addEventListener('click', function () {
    prefer(sunIcon, sunny, 'sunnyIcon', weatherData);
  });
  coldIcon.addEventListener('click', function () {
    prefer(coldIcon, cold, 'snowflakeIcon', weatherData);
  });
  rainIcon.addEventListener('click', function () {
    prefer(rainIcon, rainy, 'rainyIcon', weatherData);
  });
};
