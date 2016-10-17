var data = require('./data.js');
var list = data.list; 

// CREATE TOP WRAPPER
function hWrap (value) {
   return value + ' ' + Array(30 - (value.length + 1)).join('=');
}

// CREATE BOTTOM WRAPPER
function fWrap () {
   return Array(30).join('=');
}

function capitalize(string)  {  
  var words = string.split(' ');  
  var newWords = [];
  newWords.push(words[0].charAt(0).toUpperCase() + words[0].slice(1)); 
  return newWords.join(' ');
}  

// CONVERT KELVIN TO FARENHEIDT
function toF (value) {
   return Math.floor(value * 9 / 5 - 459.67);
}

// CONVERT WIND SPEED TO MPH, ROUNDED TO ONE DECIMAL PLACE
function toMPH (value) {
   return Math.round((value * .621371) * 10) / 10;
}

// CONVERT WIND DEGREES TO CARDINAL DIRECTION
function toCard (value) {
   if (value >= 348.75 || value <= 11.25) {
      return 'N';
   } else if (value > 11.25 && value <= 78.75) {
      return 'NE';
   } else if (value > 78.75 && value <= 123.75) {
      return 'E';
   } else if (value > 123.75 && value <= 168.75) {
      return 'SE';
   } else if (value > 168.75 && value <= 213.75) {
      return 'S';
   } else if (value > 213.75 && value <= 258.75) {
      return 'SW';
   } else if (value > 258.75 && value <= 303.75) {
      return 'W';
   } else if (value > 303.75 && value < 348.75) {
      return 'NW';
   }
}

function weatherInfo (city) {
  return hWrap(city.name) + '\n' +
    capitalize(city.weather[0].description) + '\n' +
    'Temp: ' + toF(city.main.temp) + '\xB0F' + '\n' +
    'Lo: ' + toF(city.main.temp_min) + '\xB0F' +
    ', Hi: ' + toF(city.main.temp_max) + '\xB0F' + '\n' +
    'Humidity: ' + city.main.humidity + '%' + '\n' +
    'Wind: ' + toMPH(city.wind.speed) + ' MPH ' + toCard(city.wind.deg) + '\n' +
    fWrap();
}

// WEATHER REPORT
function report (list) {
  return list.map(weatherInfo);
}

// ALPHABETIZE
function alphOrder (array) {
   var mapped = array.map(report);
   mapped.sort();
   var sorted;
   mapped.forEach(function (value) {
      sorted += value + '\n';
   });
   return sorted;
}

console.log(report(list).sort().join('\n'));

// console.log(toCard(10));
// console.log(report({name: 'Budapest XII. keruelet'}));
// console.log(hWrap('Columbia') + '\n' + fWrap());
// console.log(conditions('Clear'));
// console.log(list.map(report));

// console.log(capitalize('vroom vroom'));
// console.log(alphOrder(list));

// AVERAGES -------------------------------

// DESCRIPTIONS

var descriptions = list.map(function (value) {
  return value.weather[0].description;
});

var freq = descriptions.reduce(function (counts, desc) {
  if (counts[desc] === undefined) { 
      counts[desc] = 1;
  } else {
    counts[desc]++;
  }
  return counts;
}, {});

var avgCond;

for (var prop in freq) {
  if (!avgCond || (freq[prop] > freq[avgCond])) {
    avgCond = prop;
  }
}

// TEMPERATURE

var temps = list.map(function (value) {
  return value.main.temp;
});

var avgTemp = temps.reduce(function (prev, next) {
  return prev += next;
}) / list.length;

// MINIMUM

var minTemps = list.map(function (value) {
  return value.main.temp_min;
});

var avgMin = minTemps.reduce(function (prev, next) {
  return prev += next;
}) / list.length;

// MAXIMUM

var maxTemps = list.map(function (value) {
  return value.main.temp_max;
});

var avgMax = maxTemps.reduce(function (prev, next) {
  return prev += next;
}) / list.length;

// HUMIDITY

var humidities = list.map(function (value) {
  return value.main.humidity;
});

var avgHum = humidities.reduce(function (prev, next) {
  return prev += next;
}) / list.length;

// WIND SPEED/DIRECTION

// SPEED

var windSpeeds = list.map(function (value) {
  return value.wind.speed;
});

var avgSpd = Math.round((windSpeeds.reduce(function (prev, next) {
  return prev += next;
}) / list.length) * 10) / 10;

// DIRECTION

var windDir = list.map(function (value) {
  return value.wind.deg;
});

var avgDir = windDir.reduce(function (prev, next) {
  return prev += next;
}) / list.length;

// AVERAGES

var avgList = {
   "name": "Averages",
   "main": {
      "temp": avgTemp,
      "temp_min": avgMin,
      "temp_max": avgMax,
      "humidity": avgHum
   },
   "wind": {
      "speed": avgSpd,
      "deg": avgDir
   },
   "weather":[
      {
         "description": avgCond,
      }
   ]
};

console.log(weatherInfo(avgList));


