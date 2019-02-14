'use strict';

var compare = function compare(left, right) {
  if (!left) {
    throw new Error('Left is missing.');
  }
  if (!right) {
    throw new Error('Right is missing.');
  }

  var leftParts = left.split('.'),
      rightParts = right.split('.');

  var max = Math.max(leftParts.length, rightParts.length);

  for (var i = 0; i < max; i++) {
    var leftMatch = leftParts[i] ? leftParts[i].match(/^\d+/) : null,
        rightMatch = rightParts[i] ? rightParts[i].match(/^\d+/) : null;

    var leftVersion = leftMatch ? Number(leftMatch[0]) : 0,
        rightVersion = rightMatch ? Number(rightMatch[0]) : 0;

    if (leftVersion > rightVersion) {
      return 1;
    }
    if (rightVersion > leftVersion) {
      return -1;
    }
  }

  return 0;
};

var lessThan = function lessThan(left, right) {
  return compare(left, right) === -1;
};

var lessThanOrEqual = function lessThanOrEqual(left, right) {
  return compare(left, right) <= 0;
};

var equal = function equal(left, right) {
  return compare(left, right) === 0;
};

var greaterThanOrEqual = function greaterThanOrEqual(left, right) {
  return compare(left, right) >= 0;
};

var greaterThan = function greaterThan(left, right) {
  return compare(left, right) === 1;
};

module.exports = { compare: compare, lessThan: lessThan, lessThanOrEqual: lessThanOrEqual, equal: equal, greaterThanOrEqual: greaterThanOrEqual, greaterThan: greaterThan };