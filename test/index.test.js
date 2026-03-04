const test = require('node:test');
const assert = require('node:assert/strict');

const {
  factorial,
  fibonacci,
  palindrome,
  binarySearch,
  sorting,
  selectionSort,
  bubbleSort,
  quickSort,
  mergeSort,
  reverseString,
  arrayWithoutDuplicates,
  arrayWithoutDuplicates2,
} = require('../index');

test('factorial works for standard inputs and errors for negatives', () => {
  assert.equal(factorial(0), 1);
  assert.equal(factorial(5), 120);
  assert.throws(() => factorial(-1), /Negative numbers/);
});

test('fibonacci returns expected sequence values', () => {
  assert.equal(fibonacci(0), 0);
  assert.equal(fibonacci(1), 1);
  assert.equal(fibonacci(7), 13);
  assert.throws(() => fibonacci(-2), /Negative numbers/);
});

test('string helpers handle reverse and palindrome checks', () => {
  assert.equal(reverseString('abc'), 'cba');
  assert.equal(palindrome('A man, a plan, a canal: Panama'), true);
  assert.equal(palindrome('hello'), false);
});

test('array helpers remove duplicates preserving first occurrence order', () => {
  const input = [3, 1, 3, 2, 1, 2];
  const expected = [3, 1, 2];

  assert.deepEqual(arrayWithoutDuplicates(input), expected);
  assert.deepEqual(arrayWithoutDuplicates2(input), expected);
});

test('binarySearch finds element index in sorted array and returns -1 if missing', () => {
  const arr = [1, 3, 5, 8, 13, 21];
  assert.equal(binarySearch(arr, 8), 3);
  assert.equal(binarySearch(arr, 2), -1);
});

test('sorting comparator is ascending', () => {
  assert.deepEqual([5, 2, 10, 1].sort(sorting), [1, 2, 5, 10]);
});

test('selectionSort and bubbleSort sort array in place', () => {
  const forSelection = [4, 2, 7, 1];
  const forBubble = [4, 2, 7, 1];

  assert.equal(selectionSort(forSelection), forSelection);
  assert.equal(bubbleSort(forBubble), forBubble);
  assert.deepEqual(forSelection, [1, 2, 4, 7]);
  assert.deepEqual(forBubble, [1, 2, 4, 7]);
});

test('quickSort and mergeSort return sorted arrays', () => {
  const arr = [9, 3, 7, 3, 1, 8];
  const expected = [1, 3, 3, 7, 8, 9];

  assert.deepEqual(quickSort(arr), expected);
  assert.deepEqual(mergeSort(arr), expected);
});
