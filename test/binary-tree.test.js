const test = require('node:test');
const assert = require('node:assert/strict');

const { BinarySearchTree } = require('../binary-tree');

test('BinarySearchTree insert/contains/findMin/findMax/size', () => {
  const tree = new BinarySearchTree(10);
  tree.insert(5);
  tree.insert(15);
  tree.insert(3);
  tree.insert(7);
  tree.insert(20);

  assert.equal(tree.contains(7), true);
  assert.equal(tree.contains(8), false);
  assert.equal(tree.findMin(), 3);
  assert.equal(tree.findMax(), 20);
  assert.equal(tree.size(), 6);
});
