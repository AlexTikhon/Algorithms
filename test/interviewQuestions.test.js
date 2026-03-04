const test = require('node:test');
const assert = require('node:assert/strict');

const {
  debounce,
  once,
  flatten,
  throttle,
  uniqueArr,
  chunk,
  memoize,
  EventEmmiterForMe,
  Module,
  createCar,
  mySort,
  str1,
  str2,
  Singleton,
} = require('../interviewQuestions');

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

test('once calls wrapped function only once', () => {
  let calls = 0;
  const fn = once((n) => {
    calls += 1;
    return n * 2;
  });

  assert.equal(fn(2), 4);
  assert.equal(fn(100), 4);
  assert.equal(calls, 1);
});

test('flatten respects depth argument', () => {
  const input = [1, [2, [3, [4]]]];
  assert.deepEqual(flatten(input, 1), [1, 2, [3, [4]]]);
  assert.deepEqual(flatten(input, 2), [1, 2, 3, [4]]);
  assert.deepEqual(flatten(input, 10), [1, 2, 3, 4]);
});

test('uniqueArr keeps unique values preserving order', () => {
  assert.deepEqual(uniqueArr([1, 2, 1, 3, 2]), [1, 2, 3]);
});

test('chunk splits array to fixed-size parts', () => {
  assert.deepEqual(chunk([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]]);
  assert.deepEqual(chunk([1, 2], 5), [[1, 2]]);
  assert.deepEqual(chunk([1, 2, 3], 0), []);
});

test('memoize caches function result by arguments', () => {
  let calls = 0;
  const fn = memoize((a, b) => {
    calls += 1;
    return a + b;
  });

  assert.equal(fn(2, 3), 5);
  assert.equal(fn(2, 3), 5);
  assert.equal(fn(3, 3), 6);
  assert.equal(calls, 2);
});

test('EventEmmiterForMe subscribe/emit calls listeners with payload', () => {
  const emitter = new EventEmmiterForMe();
  const results = [];

  emitter.subscribe('done', (payload) => results.push(payload));
  emitter.emit('done', 'ok');

  assert.deepEqual(results, ['ok']);
});

test('Module keeps private counter and increments', () => {
  const first = Module.increment();
  const second = Module.increment();

  assert.equal(second, first + 1);
});

test('factory, strategy, singleton basics', () => {
  assert.deepEqual(createCar('s', 'red'), { color: 'red', speed: '250' });
  assert.deepEqual(mySort([3, 1, 2], str1), [1, 2, 3]);
  assert.deepEqual(mySort([3, 1, 2], str2), [3, 2, 1]);

  const a = new Singleton();
  const b = new Singleton();
  assert.equal(a, b);
});

test('debounce triggers only the last call after delay', async () => {
  const calls = [];
  const fn = debounce((value) => calls.push(value), 30);

  fn('a');
  fn('b');
  fn('c');
  await wait(50);

  assert.deepEqual(calls, ['c']);
});

test('throttle ignores calls during cooldown window', async () => {
  const calls = [];
  const fn = throttle((value) => calls.push(value), 40);

  fn('a');
  fn('b');
  await wait(45);
  fn('c');

  assert.deepEqual(calls, ['a', 'c']);
});
