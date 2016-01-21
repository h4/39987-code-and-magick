'use strict';

function getMessage(a, b) {
  if (typeof a === "boolean") {
    if (a === true) {
      return "Я попал в " + b;
    } else {
      return "Я никуда не попал";
    }
  }
  if (typeof a === "number") {
    return "Я прыгнул на " + a * 100 + " сантиметров";
  }
  if (typeof a === "object" && typeof b === "object") {
    var length = 0;
    var i;
    for(i = 0; i < a.length; i++) {
      length += a[i] * b[i];
    }
    return "Я прошёл " + length + " метров";
  }
  if (typeof a === "object") {
    var sum = a.reduce(function(previousValue, currentValue) {
      return previousValue + currentValue;
    });
    return "Я прошел " + sum + " шагов";
  }
}
