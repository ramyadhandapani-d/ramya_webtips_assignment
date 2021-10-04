const APIURL = 'http://127.0.0.1:8000';
const allTimeApi = '/all-timezone-cities';

// To fetch the weather data of all cities
export async function allTimeZone() {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };
  return fetch(APIURL + allTimeApi, requestOptions)
    .then((response) => response.json())
    .catch((error) => console.log('error', error));
}

export async function timeCity(cityName) {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };
  return fetch(APIURL + '/city?city=' + cityName, requestOptions)
    .then((response) => response.json())
    .then(async (result) => {
      const x = await nextNHours(result.city_Date_Time_Name, 6);
      return x.temperature;
    })
    .catch((error) => console.log('error', error));
}

// To get temperature data for next N hours
export async function nextNHours(cityTime, N) {
  const myHeaders = new Headers();
  let useExpress = true; // Change this to false to use HTTP module
  myHeaders.append(
    'Content-Type',
    useExpress
      ? 'application/json'
      : 'application/x-www-form-urlencoded;charset=UTF-8'
  );
  const raw = JSON.stringify({
    city_Date_Time_Name: cityTime,
    hours: N,
  });
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };
  return await fetch(APIURL + '/hourly-forecast', requestOptions)
    .then((response) => response.json())
    .catch((error) =>
      console.log('error', error, 'SOLUTION : Try changing api.js:32 to false')
    );
}

export async function updateAllCities(data) {
  const allCityData = await allTimeZone();
  for (const currentCityData of allCityData) {
    const dataKey = currentCityData.cityName.toLowerCase();
    data[dataKey] = currentCityData;
  }
}
