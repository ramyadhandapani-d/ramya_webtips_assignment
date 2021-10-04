export const getDateAndTime = function(currentCity, data) {
  const [date, timeWithSec] = data[currentCity]['dateAndTime'].split(',');
  const [, time, meridiem] = timeWithSec.split(' ');
  const sec = time.split(':');
  return [date, timeWithSec, time, meridiem.toUpperCase(), ...sec];
}

export const getParameters = function(currentCity, data) {
  const fahrenvalue = parseInt(data[currentCity]['temperature']);
  const fahren = (fahrenvalue * (9 / 5) + 32).toFixed(1) + ' F';
  const temp = data[currentCity]['temperature'];
  const hum = data[currentCity]['humidity'];
  const prec = data[currentCity]['precipitation'];
  return [temp, hum, fahren, prec];
}

export const temperatureCategory = function(data) {
  const sunny = [];
  const rainy = [];
  const cold = [];
  for (const i in data) {
    const temperature = parseFloat(data[i]['temperature']);
    if (temperature > 29) {
      sunny.push([i, data[i]]);
    } else if (temperature < 20) {
      rainy.push([i, data[i]]);
    } else {
      cold.push([i, data[i]]);
    }
  }
  return [sunny, rainy, cold];
}

export const sortContinent = function(data) {
  const continentSortAscend = [];
  for (const key in data) {
    continentSortAscend.push(key);
  }
  continentSortAscend.sort(function (a, b) {
    let [timezone1] = data[a]['timeZone'].split('/');
    let [timezone2] = data[b]['timeZone'].split('/');
    if (timezone1 < timezone2) {
      return -1;
    }
    if (timezone1 > timezone2) {
      return 1;
    }
    return 0;
  });
  const continentSortDescend = [...continentSortAscend].reverse();
  return [continentSortAscend, continentSortDescend];
}

export const sortTempAscend = function(data, order) {
  const temperatureSortAscend = order;
  temperatureSortAscend.sort(function (a, b) {
    let [timezone1] = data[a]['timeZone'].split('/');
    let [timezone2] = data[b]['timeZone'].split('/');
    if (timezone1 < timezone2) {
      return 0;
    }
    if (timezone1 > timezone2) {
      return 0;
    }
    if (timezone1 == timezone2) {
      let temp1 = parseFloat(data[a]['temperature']);
      let temp2 = parseFloat(data[b]['temperature']);
      return temp1 - temp2;
    }
  });
  return temperatureSortAscend;
}
export const sortTempDescend = function(data, order) {
  const temperatureSortDescend = order;
  temperatureSortDescend.sort(function (a, b) {
    let [timezone1] = data[a]['timeZone'].split('/');
    let [timezone2] = data[b]['timeZone'].split('/');
    if (timezone1 < timezone2) {
      return 0;
    }
    if (timezone1 > timezone2) {
      return 0;
    }
    if (timezone1 == timezone2) {
      let temp1 = parseFloat(data[a]['temperature']);
      let temp2 = parseFloat(data[b]['temperature']);
      return temp2 - temp1;
    }
  });
  return temperatureSortDescend;
}
