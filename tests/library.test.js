import add from '../src/add.js';
import at from '../src/at.js';
import camelCase from '../src/camelCase.js';
import capitalize from '../src/capitalize.js';
import castArray from '../src/castArray.js';
import ceil from '../src/ceil.js';
import chunk from '../src/chunk.js';
import clamp from '../src/clamp.js';
import compact from '../src/compact.js';
import countBy from '../src/countBy.js';
import defaultTo from '../src/defaultTo.js';
import defaultToAny from '../src/defaultToAny.js';
import difference from '../src/difference.js';
import divide from '../src/divide.js';
import drop from '../src/drop.js';
import endsWith from '../src/endsWith.js';
import eq from '../src/eq.js';
import every from '../src/every.js';
import filter from '../src/filter.js';
import get from '../src/get.js';
import isArguments from '../src/isArguments.js';
import isArrayLike from '../src/isArrayLike.js';
import isBoolean from '../src/isBoolean.js';
import isBuffer from '../src/isBuffer.js';
import isDate from '../src/isDate.js';
import isEmpty from '../src/isEmpty.js';
import isObject from '../src/isObject.js';
import map from '../src/map.js';
import reduce from '../src/reduce.js';
import toString from '../src/toString.js';

describe('Library Unit Tests', () => {

  // 1. add
  test('add: adds two numbers', () => {
    expect(add(6, 4)).toBe(10);
    expect(add(6, -4)).toBe(2);
  });

  // 2. at
  test('at: creates array of values at paths', () => {
    const object = { 'a': [{ 'b': { 'c': 3 } }, 4] };
    expect(at(object, ['a[0].b.c', 'a[1]'])).toEqual([3, 4]);
  });

  // 3. camelCase
  test('camelCase: converts string to camelCase', () => {
    expect(camelCase('Foo Bar')).toBe('fooBar');
    expect(camelCase('--foo-bar--')).toBe('fooBar');
    expect(camelCase('__FOO_BAR__')).toBe('fooBar');
  });

  // 4. capitalize
  test('capitalize: capitalizes first character', () => {
    expect(capitalize('FRED')).toBe('Fred');
    expect(capitalize('jm')).toBe('Jm');
  });

  // 5. castArray
  test('castArray: casts value to array', () => {
    expect(castArray(1)).toEqual([1]);
    expect(castArray({ 'a': 1 })).toEqual([{ 'a': 1 }]);
    expect(castArray('abc')).toEqual(['abc']);
    expect(castArray(null)).toEqual([null]);
    expect(castArray(undefined)).toEqual([undefined]);
    expect(castArray()).toEqual([]);
  });

  // 6. ceil
  test('ceil: rounds up to precision', () => {
    expect(ceil(4.006)).toBe(5);
    expect(ceil(6.004, 2)).toBe(6.01);
    expect(ceil(6040, -2)).toBe(6100);
  });

  // 7. chunk
  test('chunk: splits array into chunks', () => {
    expect(chunk(['a', 'b', 'c', 'd'], 2)).toEqual([['a', 'b'], ['c', 'd']]);
    expect(chunk(['a', 'b', 'c', 'd'], 3)).toEqual([['a', 'b', 'c'], ['d']]);
  });

  // 8. clamp
  test('clamp: clamps number within bounds', () => {
    expect(clamp(-10, -5, 5)).toBe(-5);
    expect(clamp(10, -5, 5)).toBe(5);
  });

  // 9. compact
  test('compact: removes falsey values', () => {
    expect(compact([0, 1, false, 2, '', 3])).toEqual([1, 2, 3]);
  });

  // 10. countBy
  test('countBy: counts instances', () => {
     const users = [
       { 'user': 'barney', 'active': true },
       { 'user': 'betty', 'active': true },
       { 'user': 'fred', 'active': false }
     ];
     expect(countBy(users, value => value.active)).toEqual({ 'true': 2, 'false': 1 });
  });

  // 11. defaultTo
  test('defaultTo: returns default if value is NaN/null/undefined', () => {
    expect(defaultTo(1, 10)).toBe(1);
    expect(defaultTo(undefined, 10)).toBe(10);
  });

  // 12. defaultToAny
  test('defaultToAny: returns first valid default', () => {
    expect(defaultToAny(1, 10, 20)).toBe(1);
    expect(defaultToAny(undefined, 10, 20)).toBe(10);
    expect(defaultToAny(undefined, null, 20)).toBe(20);
  });

  // 13. difference
  test('difference: excludes values', () => {
    expect(difference([2, 1], [2, 3])).toEqual([1]);
  });

  // 14. divide
  test('divide: divides numbers', () => {
    expect(divide(6, 4)).toBe(1.5);
  });

  // 15. drop
  test('drop: slices array from start', () => {
    expect(drop([1, 2, 3])).toEqual([2, 3]);
    expect(drop([1, 2, 3], 2)).toEqual([3]);
    expect(drop([1, 2, 3], 5)).toEqual([]);
    expect(drop([1, 2, 3], 0)).toEqual([1, 2, 3]);
  });

  // 16. endsWith
  test('endsWith: checks if string ends with target', () => {
    expect(endsWith('abc', 'c')).toBe(true);
    expect(endsWith('abc', 'b')).toBe(false);
    expect(endsWith('abc', 'b', 2)).toBe(true);
  });

  // 17. eq
  test('eq: performs SameValueZero comparison', () => {
    const object = { 'a': 1 };
    const other = { 'a': 1 };
    expect(eq(object, object)).toBe(true);
    expect(eq(object, other)).toBe(false);
    expect(eq('a', 'a')).toBe(true);
    expect(eq('a', Object('a'))).toBe(false);
    expect(eq(NaN, NaN)).toBe(true);
  });

  // 18. every
  test('every: checks if predicate is true for all', () => {
    expect(every([true, 1, null, 'yes'], Boolean)).toBe(false);
    expect(every([true, 1, 'yes'], Boolean)).toBe(true);
  });

  // 19. filter
  test('filter: iterates and filters array', () => {
    const users = [
      { 'user': 'barney', 'active': true },
      { 'user': 'fred',   'active': false }
    ];
    expect(filter(users, ({ active }) => active)).toEqual([{ 'user': 'barney', 'active': true }]);
  });

  // 20. get
  test('get: retrieves value at path', () => {
    const object = { 'a': [{ 'b': { 'c': 3 } }] };
    expect(get(object, 'a[0].b.c')).toBe(3);
    expect(get(object, ['a', '0', 'b', 'c'])).toBe(3);
    expect(get(object, 'a.b.c', 'default')).toBe('default');
  });

  // 21. isArguments
  test('isArguments: checks if value is arguments object', () => {
    expect(isArguments(function() { return arguments }())).toBe(true);
    expect(isArguments([1, 2, 3])).toBe(false);
  });

  // 22. isArrayLike
  test('isArrayLike: checks if value is array-like', () => {
    expect(isArrayLike([1, 2, 3])).toBe(true);
    expect(isArrayLike('abc')).toBe(true);
    expect(isArrayLike(Function)).toBe(false);
  });

  // 23. isBoolean
  test('isBoolean: checks if value is boolean', () => {
    expect(isBoolean(false)).toBe(true);
    expect(isBoolean(null)).toBe(false);
  });

  // 24. isBuffer
  test('isBuffer: checks if value is buffer', () => {
    expect(isBuffer(new Uint8Array(2))).toBe(false); 
    // Note: Mocking actual Buffer might be needed in some envs, but basic false check passes.
  });

  // 25. isDate
  test('isDate: checks if value is Date object', () => {
    expect(isDate(new Date)).toBe(true);
    expect(isDate('Mon April 23 2012')).toBe(false);
  });

  // 26. isEmpty
  test('isEmpty: checks if value is empty', () => {
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty(true)).toBe(true);
    expect(isEmpty(1)).toBe(true);
    expect(isEmpty([1, 2, 3])).toBe(false);
    expect(isEmpty('abc')).toBe(false);
    expect(isEmpty({ 'a': 1 })).toBe(false);
  });

  // 27. isObject
  test('isObject: checks if value is object-like', () => {
    expect(isObject({})).toBe(true);
    expect(isObject([1, 2, 3])).toBe(true);
    expect(isObject(null)).toBe(false);
  });

  // 28. map
  test('map: creates array of values by iteratee', () => {
    function square(n) { return n * n; }
    expect(map([4, 8], square)).toEqual([16, 64]);
  });

  // 29. reduce
  test('reduce: reduces collection to value', () => {
    expect(reduce([1, 2], (sum, n) => sum + n, 0)).toBe(3);
    expect(reduce({ 'a': 1, 'b': 2, 'c': 1 }, (result, value, key) => {
      (result[value] || (result[value] = [])).push(key);
      return result;
    }, {})).toEqual({ '1': ['a', 'c'], '2': ['b'] });
  });

  // 30. toString
  test('toString: converts value to string', () => {
    expect(toString(null)).toBe('');
    expect(toString(-0)).toBe('-0');
    expect(toString([1, 2, 3])).toBe('1,2,3');
  });
});