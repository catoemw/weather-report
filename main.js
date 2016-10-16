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


// CAPITALIZE DESCRIPTION
function capitalize(string)  {  
  var words = string.split(' ');  
  var newWords = [];
  words.forEach(function (value) {
   newWords.push(value.charAt(0).toUpperCase() + value.slice(1));
  });  
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

// WEATHER REPORT
function report (location) {
  var weather;
  list.forEach(function (value) {
   for (var prop in location) {
      if (value[prop] === location[prop]) {
         weather = hWrap(value.name) + '\n' +
            capitalize(value.weather[0].description) + '\n' +
            'Temp: ' + toF(value.main.temp) + '\xB0F' + '\n' +
            'Lo: ' + toF(value.main.temp_min) + '\xB0F' +
            ', Hi: ' + toF(value.main.temp_max) + '\xB0F' + '\n' +
            'Humidity: ' + value.main.humidity + '%' + '\n' +
            'Wind: ' + toMPH(value.wind.speed) + ' MPH ' + toCard(value.wind.deg) + '\n' +
            fWrap();
      }
   }
  });
  return weather;
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

// console.log(toCard(10));
// console.log(report({name: 'Budapest XII. keruelet'}));
// console.log(hWrap('Columbia') + '\n' + fWrap());
// console.log(conditions('Clear'));
// console.log(list.map(report));

// console.log(capitalize('vroom vroom'));
console.log(alphOrder(list));




