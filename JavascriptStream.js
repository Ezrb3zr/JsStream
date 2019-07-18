/******************************************************************************
*  Complete the following functions
******************************************************************************/

/*
The map() method creates a new array with the results of calling a provided 
function on every element in the calling array.

@param {array} collection
@param {function(currentVal, index)} callback - Function that produces an element of the new Array, taking three arguments:
  @param {any} currentValue - The current element being processed in the array.
  @param {number} index -The index of the current element being processed in the array.
  
  collection.forEach((val, index) => {
  
  });
  [1,2,3]
  cb(1, 0)
  cb(2, 1)
  cb(2, 3)
  for (var i = 0; collection.length; i++) {
    cb(collection[i], i);
  }
*/
function map(collection = [], cb ){
    let newCollection = [];
    collection.forEach((value, index) => {
      newCollection.push(cb(value,index));
    });
    return newCollection;
}

/*
The filter() method creates a new array with all elements that pass the test
implemented by the provided function.

@param {array} collection
@param {function(currentValue, index)} callback - Function is a predicate, to test each element of the array. Return true to keep the element, false otherwise. It accepts two arguments:
  @param {any} currentValue - The current element being processed in the array.
  @param {number} index -The index of the current element being processed in the array.
*/
function filter(collection = [], cb) {
  let newCollection = [];
  collection.forEach((value, index) => {
    if(cb(value, index)){
     newCollection.push(value); 
    }
  });
  return newCollection;
}

/*
The reduce() method executes a reducer function (that you provide) on each member of the array resulting in a single output value.

@param {array} collection
@param {function(accumulator, currentValue, index)} callback - Function is a predicate, to test each element of the array. Return true to keep the element, false otherwise. It accepts three arguments:
  @param {any} accumulator - The accumulator accumulates the callback's return values; it is the accumulated value previously returned in the last invocation of the callback, or initialValue, if supplied (see below).
  @param {any} currentValue - The current element being processed in the array.
  @param {number} index -The index of the current element being processed in the array.
@param {any} initialValue - Value to use as the first argument to the first call of the callback. If no initial value is supplied, the first element in the array will be used. Calling reduce() on an empty array without an initial value is an error.

*/
function reduce(collection = [], cb, initialValue) {
    if(collection.length == 0 && initialValue == null){
      return 'error';
    }
  collection.forEach((value, index) => {
    initialValue = cb(initialValue, value, index);
  });
  
  return initialValue;
  
}


/******************************************************************************
*  Tests that will exercise your implementation. No need to edit these.
******************************************************************************/
const Mocha = require('mocha');
const mocha = new Mocha();
const assert = require('assert');
mocha.suite.emit('pre-require', this, 'solution', mocha);

describe('tests', function() {
  describe('map', function() {
    it('should multiply each value by 2', function(done) {
      const values = [1, 2, 3, 4];
      const results = map(values, function(val) {
        return val * 2;
      });
      assert.deepEqual(results, [2, 4, 6, 8]);
      done();
    });
    it('should reverse each string', function(done) {
      const values = ['foo', 'bar'];
      const results = map(values, function(val) {
        return val.split('').reverse().join('');
      });
      assert.deepEqual(results, ['oof', 'rab']);
      done();
    });
    it('should return the value for the key "value" of each object', function(done) {
      const values = [
        { value: 'this is a value' },
        { value: 'this is another value' }
      ];
      const results = map(values, function(val) {
        return val.value;
      });
      assert.deepEqual(results, ['this is a value', 'this is another value']);
      done();
    });
    it('should add the array index to each item', function(done) {
      const values = [1, 2, 3, 4];
      const results = map(values, function(val, index) {
        return val + index;
      });
      assert.deepEqual(results, [1, 3, 5, 7]);
      done();
    });
  });
  describe('filter', function() {
    it('should filter all even numbers', function(done) {
      const values = [1, 2, 3, 4];
      const results = filter(values, function(val) {
        return val % 2 === 0;
      });
      assert.deepEqual(results, [2, 4]);
      done();
    });
    it('should filter out non null values', function(done) {
      const values = ['foo', null, 10, { foo: 'bar' }];
      const results = filter(values, function(val) {
        return val !== null;
      });
      assert.deepEqual(results, ['foo', 10, { foo: 'bar' }]);
      done();
    });
  });
  describe('reduce', function() {
    it('should sum all numbers of an array', function(done) {
      const values = [1, 2, 3, 4];
      const result = reduce(values, function(accumulator, val, index) {
        return accumulator + val;
      }, 0);
      assert.equal(result, 10);
      done();
    });
    it('should create an array from the values of the key "foo" in each object', function(done) {
      const values = [{ foo: 'bar' }, { foo: 10 }];
      const result = reduce(values, function(accumulator, val, index) {
        accumulator.push(val.foo);
        return accumulator;
      }, []);
      assert.deepEqual(result, ['bar', 10]);
      done();
    });
  });
});

mocha.run();