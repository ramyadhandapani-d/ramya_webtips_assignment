import { top } from './topSection/top.js';
import { middle } from './middleSection/middle.js';
import { bottom } from './bottomSection/bottom.js';
import { data } from './weatherInfo/weatherData.js';
import { updateAllCities } from './weatherInfo/api.js';
const fourHoursInSec = 14400000;
updateAllCities(data).then(() => {
  top(data);
  middle(data);
  bottom(data);
});
setInterval(() => {
  updateAllCities(data).then(() => middle(data));
}, fourHoursInSec);
