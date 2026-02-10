//debounce откладывает вызов функции, пока не пройдет delay мс без новых вызовов.
//Если новый вызов пришёл раньше — предыдущий таймер отменяется
function debounce(fn, delay) {
	let timerId;
	let ctx = this;

	return function (...args) {
		clearTimeout(timerId);
		timerId = setTimeout(() => {
			fn.apply(ctx, args);
		}, delay);
	}
}

// Обертка, которая разрешает выполнить fn только 1 раз. Дальше возвращает сохраненный первый результат.
function once(fn) {
	let called = false
	let result

	return function (...args) {
		if (!called) {
			called = true
			result = fn.apply(this, args)
		}
		return result
	}
}


// “Разворачивает” вложенные массивы на заданную глубину.
function flatten(arr, depth = 1) {
	if (depth <= 0) return arr.slice()
	let res = []

	for (let i in arr) {
		if (Array.isArray(arr[i])) {
			res.push(...flatten(arr[i], depth - 1))
		} else {
			res.push(arr[i])
		}
	}

	return res
}

// функция может вызваться только если с прошлого успешного вызова прошло delay мс. Если вызов происходит раньше, он игнорируется.
function throttle(fn, delay) {
	let lastCall = 0
	return function (...args) {
		if (Date.now() - lastCall >= delay) {
			lastCall = Date.now()
			fn.apply(this, args)
		}
	}
}

//уникальный массив и сохраняя порядок
function uniqueArr(arr) {
	const seen = new Set()
	const res = []

	for (const i of arr) {
		if (!seen.has(i)) {
			seen.add(i)
			res.push(i)
		}
	}

	return res
}

// return arr of chuncks = size
function chunk(arr, size) {
	if (arr.length <= size) return [arr.slice()]
	if (size < 0) return []
	const res = []

	for (let i = 0; i < arr.length; i += size) {
		res.push(arr.slice(i, i + size))
	}

	return arr
}

// кэширование результата функции по её аргументам
function memoize(fn) {
	const cache = new Map()

	return function (...args) {
		const key = JSON.stringify(args)

		if (cache.has(key)) return cache.get(key)

		const res = fn.apply(this, args)
		cache.set(key, res)
		return res
	}
}

// pattern Observer
class EventEmmiter_forMe {
	constructor() {
		subscribers = {}
	}

	subscribe(event, callback) {
		if (!this.subscribers[event]) this.subscribers[event] = []

		this.subscribers[event].push(callback)
	}

	emit(event, data) {
		if (this.subscribers[event]) {
			for (const callback of this.subscribers[event]) callback(data)
		}
	}
}

//pattern Module
const Module = (function () {
	let count = 0

	function privateLog() { console.log(count) }

	return {
		increment() {
			count++
			privateLog()
		}
	}
})
Module.increment()


// pattern Factory
function createCar(type, color) {
	const car = {}
	car.color = color

	if (type === 'f') car.speed = '150'
	if (type === 's') car.speed = '250'

	return car
}
const car = createCar('s', 'red')


// pattern Strategy
function mySort(arr, strategy) {
	return arr.slice().sort(strategy)
}
const str1 = (a, b) => a - b
const str2 = (a, b) => b - a


//pattern Singleton
class Singleton {
	constructor() {
		if (Singleton.instance) return Singleton.instance

		this.value = 'Singleton'
		Singleton.instance = this
	}
}

// Decorator
