'use strict';

const assert = require('assertthat');

const dockerCompare = require('../../lib/dockerCompare');

suite('dockerCompare', () => {
  test('throws an error if left is missing.', done => {
    assert.that(() => {
      dockerCompare.compare();
    }).is.throwing('Left is missing.');
    done();
  });

  test('throws an error if right is missing.', done => {
    assert.that(() => {
      dockerCompare.compare('1.0');
    }).is.throwing('Right is missing.');
    done();
  });

  test('1.12 equals 1.12.', done => {
    assert.that(dockerCompare.compare('1.12', '1.12')).is.equalTo(0);
    done();
  });

  test('1.0.0 equals 1.', done => {
    assert.that(dockerCompare.compare('1.0.0', '1')).is.equalTo(0);
    done();
  });

  test('1 equals 1.0.0.', done => {
    assert.that(dockerCompare.compare('1', '1.0.0')).is.equalTo(0);
    done();
  });

  test('1.05.00.0156 is greater than 1.0.221.9289.', done => {
    assert.that(dockerCompare.compare('1.05.00.0156', '1.0.221.9289')).is.equalTo(1);
    done();
  });

  test('1.0.1 is greater than 1.', done => {
    assert.that(dockerCompare.compare('1.0.1', '1')).is.equalTo(1);
    done();
  });

  test('1 is less than 1.0.1.', done => {
    assert.that(dockerCompare.compare('1', '1.0.1')).is.equalTo(-1);
    done();
  });

  test('1.0.1 is less than 1.0.2.', done => {
    assert.that(dockerCompare.compare('1.0.1', '1.0.2')).is.equalTo(-1);
    done();
  });

  test('1.0.2 is less than 1.0.3.', done => {
    assert.that(dockerCompare.compare('1.0.2', '1.0.3')).is.equalTo(-1);
    done();
  });

  test('1.0.3 is less than 1.1.', done => {
    assert.that(dockerCompare.compare('1.0.3', '1.1')).is.equalTo(-1);
    done();
  });

  test('1.1 is less than 1.1.1.', done => {
    assert.that(dockerCompare.compare('1.1', '1.1.1')).is.equalTo(-1);
    done();
  });

  test('1.1.1 is less than 1.1.2.', done => {
    assert.that(dockerCompare.compare('1.1.1', '1.1.2')).is.equalTo(-1);
    done();
  });

  test('1.1.2 is less than 1.2.', done => {
    assert.that(dockerCompare.compare('1.1.2', '1.2')).is.equalTo(-1);
    done();
  });

  test('17.03-ce is less than 17.06-ce.', done => {
    assert.that(dockerCompare.compare('17.03-ce', '17.06-ce')).is.equalTo(-1);
    done();
  });

  test('17.03-ce is equal to 17.03-ee.', done => {
    assert.that(dockerCompare.compare('17.03-ce', '17.03-ee')).is.equalTo(0);
    done();
  });
});
