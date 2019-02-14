'use strict';

const compare = function (left, right) {
  if (!left) {
    throw new Error('Left is missing.');
  }
  if (!right) {
    throw new Error('Right is missing.');
  }

  const leftParts = left.split('.'),
        rightParts = right.split('.');

  const max = Math.max(leftParts.length, rightParts.length);

  for (let i = 0; i < max; i++) {
    const leftMatch = leftParts[i] ? leftParts[i].match(/^\d+/) : null,
          rightMatch = rightParts[i] ? rightParts[i].match(/^\d+/) : null;

    const leftVersion = leftMatch ? Number(leftMatch[0]) : 0,
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

const lessThan = function (left, right) {
  return compare(left, right) === -1;
};

const lessThanOrEqual = function (left, right) {
  return compare(left, right) <= 0;
};

const equal = function (left, right) {
  return compare(left, right) === 0;
};

const greaterThanOrEqual = function (left, right) {
  return compare(left, right) >= 0;
};

const greaterThan = function (left, right) {
  return compare(left, right) === 1;
};

module.exports = { compare, lessThan, lessThanOrEqual, equal, greaterThanOrEqual, greaterThan };
