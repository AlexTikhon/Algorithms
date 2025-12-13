function factorial(n) {
    if (n < 0) {
        throw new Error("Negative numbers do not have a factorial.");
    }

    if (n === 0 || n === 1) {
        return 1;
    }

    return n * factorial(n - 1);
}

function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);

        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}

function sorting(a, b) {
    return a - b;
}

function selectionSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;

        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }

        if (minIndex !== i) {
          let temp = arr[i];
          arr[i] = arr[minIndex];
          arr[minIndex] = temp;
        }
    }
    return arr;
}

function bubbleSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {

        for (let j = 0; j < n - i - 1; j++) {

            if (arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}

function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const pivot = arr[arr.length - 1];
    const left = [];
    const right = [];
    for (let i = 0; i < arr.length - 1; i++) {

        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    return [...quickSort(left), pivot, ...quickSort(right)];
}

function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));

    return merge(left, right);
}

function merge(left, right) {
    const merged = [];
    let i = 0;
    let j = 0;

    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            merged.push(left[i]);
            i++;
        } else {
            merged.push(right[j]);
            j++;
        }
    }

    return merged.concat(left.slice(i)).concat(right.slice(j));
}

module.exports = { factorial, binarySearch, sorting, selectionSort, bubbleSort, quickSort, mergeSort };
