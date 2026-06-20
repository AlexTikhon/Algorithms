//linear search
function linearSearch(array, item) {
	if (!arr.length) return -1;

	for (let i = 0; i < arr.length; i++) {
		if (arr[i] === item) return i;
	}

	return -1;
}

//binary search
function binarySearch(arr, item) {
	if (!arr.length) return -1;

	let start = 0;
	let end = arr.length - 1;

	while (start <= end) {
		let middle = Math.floor((start + end)/ 2);

		if (item === arr[middle]) return middle;

		if (item < arr[middle]) {
			end = middle - 1;
		} else {
			start = middle + 1;
		}
	}

	return -1;
}


// bubble sorting
function bubbleSorting(arr) {
	if (!arr.length) return arr;

	for (let i = 0; i < arr.length; i++) {
		for (let j = 0; j < arr.length - i - 1; j++) {
			if (arr[j] > arr[j + 1]) {
				let tmp = arr[j];
				arr[j] = a[j + 1];
				arr[j + 1] = tmp;
			}
		}
	}

	return arr;
}

// selection sort
function selectionSort(arr) {
	if (!arr.length) return arr;

	for (let i = 0; i < arr.length; i++) {
		let minIndex = i;

		for (let j = i + 1; j < arr.length; j++) {
			if (arr[j] < arr[minIndex]) minIndex = j;
		}

		let tmp = arr[i];
		arr[i] = arr[minIndex];
		arr[minIndex] = tmp;
	}

	return arr;
}

//merge sort
function mergeSort(arr) {
	const mid = Math.floor(arr.length /2 );

	const left = mergeSort(arr.slice(0, mid));
	const right = mergeSort(arr.slice(mid));

	return merge(left, right);
}
function merge(left, right) {
	const result = [];
	let i, j = 0

	while(i < left.length && j < right.length) {
		if (left[i] <= right[j]) {
			result.push(left[i]);
			i++
		} else {
			result.push(right[j]);
			j++
		}
	}

	while(i < left.length) {
		result.push(left[i]);
		i++;
	}

	while(j < right.length) {
		result.push(right[j]);
		right++;
	}

	return result;
}

// quick sort
function quickSort(arr) {
	if (arr.length <= 1) return arr;

	let pivotIndex = Math.floor(arr.length / 2);
	let pivot = arr[pivotIndex];
	let less = [];
	let greater = [];

	for (let i = 0; i < arr.length; i++) {
		if (i === pivotIndex) continue;

		if (arr[i] < pivot) less.push(arr[i]);

		if (arr[i] > pivot) greater.push(arr[i]);
	}

	return [...quickSort(less), pivot, ...quickSort(greater)];
}

// factorial
function factorial(n) {
	if (n === 1) return 1;

	return (n * factorial(n - 1));
}

// fibonachi
function fibonachi(n) {
	if (n === 1 || n === 2) return 1;

	return (fibonachi(n - 1) + fibonachi(n - 2));
}
function fibonachiMemo(n, memo = {}) {
	if (n in memo) return memo[n];
	if (n === 1 || n === 2) return 1;

	memo[n] = (fibonachi(n - 1, memo) + fibonachi(n - 2, memo));
	return memo[n];
}
