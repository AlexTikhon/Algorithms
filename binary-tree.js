class binarySearchTree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  insert(value) {
    if (value < this.value) {
      if (this.left === null) {
        this.left = new binarySearchTree(value);
      } else {
        this.left.insert(value);
      }
    } else {
      if (this.right === null) {
        this.right = new binarySearchTree(value);
      } else {
        this.right.insert(value);
      }
    }
  }

  contains(value) {
    if (value === this.value) {
      return true;
    }
    if (value < this.value) {
      if (this.left === null) {
        return false;
      } else {
        return this.left.contains(value);
      }
    } else {
      if (this.right === null) {
        return false;
      } else {
        return this.right.contains(value);
      }
    }
  }

  findMin() {
    if (this.left === null) {
      return this.value;
    } else {
      return this.left.findMin();
    }
  }

  findMax() {
    if (this.right === null) {
      return this.value;
    } else {
      return this.right.findMax();
    }
  }

  size() {
    let count = 1;
    if (this.left !== null) {
      count += this.left.size();
    }
    if (this.right !== null) {
      count += this.right.size();
    }
    return count;
  }
}
