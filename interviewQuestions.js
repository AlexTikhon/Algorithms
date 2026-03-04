function debounce(fn, delay) {
  let timerId;

  return function (...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

function once(fn) {
  let called = false;
  let result;

  return function (...args) {
    if (!called) {
      called = true;
      result = fn.apply(this, args);
    }
    return result;
  };
}

function flatten(arr, depth = 1) {
  if (depth <= 0) return arr.slice();
  const res = [];

  for (const item of arr) {
    if (Array.isArray(item)) {
      res.push(...flatten(item, depth - 1));
    } else {
      res.push(item);
    }
  }

  return res;
}

function throttle(fn, delay) {
  let lastCall = 0;

  return function (...args) {
    if (Date.now() - lastCall >= delay) {
      lastCall = Date.now();
      fn.apply(this, args);
    }
  };
}

function uniqueArr(arr) {
  const seen = new Set();
  const res = [];

  for (const item of arr) {
    if (!seen.has(item)) {
      seen.add(item);
      res.push(item);
    }
  }

  return res;
}

function chunk(arr, size) {
  if (size <= 0) return [];
  if (arr.length <= size) return [arr.slice()];

  const res = [];
  for (let i = 0; i < arr.length; i += size) {
    res.push(arr.slice(i, i + size));
  }

  return res;
}

function memoize(fn) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) return cache.get(key);

    const res = fn.apply(this, args);
    cache.set(key, res);
    return res;
  };
}

class EventEmmiterForMe {
  constructor() {
    this.subscribers = {};
  }

  subscribe(event, callback) {
    if (!this.subscribers[event]) this.subscribers[event] = [];

    this.subscribers[event].push(callback);
  }

  emit(event, data) {
    if (this.subscribers[event]) {
      for (const callback of this.subscribers[event]) callback(data);
    }
  }
}

const Module = (function () {
  let count = 0;

  function privateLog() {
    return count;
  }

  return {
    increment() {
      count++;
      return privateLog();
    },
  };
})();

function createCar(type, color) {
  const car = {};
  car.color = color;

  if (type === 'f') car.speed = '150';
  if (type === 's') car.speed = '250';

  return car;
}

function mySort(arr, strategy) {
  return arr.slice().sort(strategy);
}

const str1 = (a, b) => a - b;
const str2 = (a, b) => b - a;

class Singleton {
  constructor() {
    if (Singleton.instance) return Singleton.instance;

    this.value = 'Singleton';
    Singleton.instance = this;
  }
}

module.exports = {
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
};
