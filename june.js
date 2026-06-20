																			// Pattern 1 — HashMap
//nums = [2, 7, 11, 15]
//target = 9
//result = [0, 1]
function twoSumBruteForce(nums, target) {
	if (!nums.length || !target) return null;

	for (let i = 0; i <= nums.length; i++) {
		for (let j = i + 1; j <= nums.length; j++) {
			if (nums[i] + nums[j] === target) return [i, j];
		}
	}
	return [];
}
function twoSum(nums, target) {
	const seen = {};

	for (let i = 0; i <= nums.length; i++) {
		const current = nums[i];
		const needed = target - current;

		if (seen[needed] !== undefined) {
			return [seen[needed], i];
		}
		seen[current] = i;
	}
	return [];
}
// console.log(twoSum([2, 7, 11, 15], 13));


																			// Pattern 2 — Frequency Map
// Annagram or not
//s = "anagram"
//t = "nagaram"
//result = true
function anagram(str1, str2) {
	if (str1.length !== str2.length) return false;
	return  str1.split('').sort().join('') === str2.split('').sort().join('');
}
function anagram2(str1, str2) {
	if (str1.length !== str2.length) return false;

	const count = {};

	for (const char of str1) {
		count[char] = (count[char] || 0) + 1;
	}

	for (const char of str2) {
		if (!count[char]) return false;
		count[char]--;
	}

	return true;
}
//Сontains Duplicate items
//nums = [1, 2, 3, 1]
//result = true
function containsDuplicate(arr) {
	const uniq = new Set();

	for (val of arr) {
		if (uniq.has(val)) return true;

		uniq.add(val);
	}

	return false;
}
function containsDuplicate2(arr) {
	return new Set(arr).size !== arr.length;
}
function containsDuplicate3(arr) {
	const map = {};

	for (const val of arr) {
		if (map[val]) return true;
		map[val] = true;
	}

	return false;
}
// console.log(containsDuplicate3([1, 2, 3, 4]));


																		// Pattern 3 — Prefix / Suffix
// Product of Array Except Self
// answer[i] = product of all elements except nums[i]
function productExceptSelfBruteForce(nums) {
	const answer = [];

	for (let i = 0; i < nums.length; i++) {
		let res = 1;

		for (let j = 0; j < nums.length; j++) {
			if (i !== j) {
				res *= nums[j]
			}
		}
		answer.push(res);
	}
	return answer;
}
function productExceptSelf(nums) {
	const res = new Array(nums.length);

	res[0] = 1;
	for (let i = 1; i < nums.length; i++) {
		res[i] = res[i - 1] * nums[i - 1];
	}

	let right = 1;
	for (let i = nums.length - 1; i >= 0; i--) {
		res[i] *= right;
		right *= nums[i];
	}

	return res;
};
// console.log(productExceptSelf([1, 2, 3, 4]));


																				// Pattern 4 — Prefix Sum
//Subarray Sum Equals K - Нужно найти, сколько непрерывных подмассивов дают сумму k
//nums = [1, 1, 1]
//k = 2
function subarraySumBruteForce(nums, k) {
	let count = 0;

	for (let i = 0; i < nums.length; i++ ) {
		let sum = 0;
		for (let j = i; j < nums.length; j++) {
			sum += nums[j];

			if (sum === k) count++;
		}
	}
	return count;
};
// console.log(subarraySumBruteForce([1, 1, 1], 2));


																		//Pattern5: Two Pointers
// check is the str is a palindrome
function isPalindrome(str) {
	const cleanStr = str.toLowerCase().replace(/^a-z0-9]g/, '');
	const left = 0;
	const right = cleanStr.length - 1;

	while (left < right) {
		if (cleanStr[left] !== cleanStr[right]) return false;

		left++;
		right--;
	}
	return true;
}
//find two nums in sorted arr that give a target
function twoSumSorted(arr, target) {
	const left = 0;
	const right = arr.length - 1;

	while (left < right) {
		const sum = arr[right] + arr[left];

		if (sum === target) {
			return [right, left]
		}

		if (sum < target) {
			left++;
		} else {
			right--;
		}
	}
	return [];
}






// small tasks
function removeDuplicates(arr) {
	return [... new Set(arr)];
}
function findPalindrome(str) {
	let cleanStr = str.toLowerCase().replace(/[^a-z0-9]g/, '');
	return str === [...cleanStr].reverse().join('');
}
function firstDuplicate(arr) {
	const seen = new Set();

	for (let item of arr) {
		if (seen.has(item)) return item;

		seen.add(item);
	}
	return null;
}
function isAnagrams(str1, str2) {
	const map = new Map();

	for (let char of str1) {
		if (map.has(char)){
			map.set(char, +1)
		} else {
			map.set(char, 0)
		}
	}

	for (let char of str2) {
		if(!map.has(char)) return false;
		map.set(char, -1);
	}
	return true;
}
function twoSum(arr, sum) {
	const map = new Map();

	for (let i = 0; i < arr.length; i++) {
		let needed = sum - arr[i];
		if (map.has(needed)) return [map.get(needed), i];

		map.set(arr[i], i);
	}
	return null;
}
function strReverse(str) {
	return [...str].reverse().join('');
}
function firstUniqueCharacter(str) {
	const map = new Map();

	for (let char of str) {
		if (map.has(char)) {
 			map.set(char, +1);
		} else {
			map.set(char, 0);
		}
	}

	for (let i = 0; i < str.length; i++) {
		if (map.get(i) === 1) return i;
	}

	return -1;
}


																				// Linked List
class Node {};
//Reverse Linked List
function reverseList(head) {
	let prev = null;
	let curr = head;

	while (curr) {
		const next = curr.next;
		curr.next = prev;
		prev = curr;
		curr = next;
	}

	return prev;
}
//Linked List Cycle
function hasCycle(head) {
	let slow = head;
	let fast = head;

	while (fast && fast.next) {
		slow = slow.next;
		fast = fast.next.next;

		if (slow === fast) return true;
	}
	return false;
};
//
function removeNthFromEnd(head, n){
	const dummy = new Node();
	let slow = dummy;
	let fast = dummy;

	for (let i = 0; i <= n; i++) {
		fast = fast.next;
	}

	while(fast) {
		slow = slow.next;
		fast = fast.next;
	}

	slow.next = slow.next.next;

	return dummy.next;
}
//reverse list - recursive
function reverseListRecursive(head) {
	if (!head || !head.next) return head;

	const newHead = reverseListRecursive(head.next);

	head.next.next = head;
	head.next = null;
	return newHead;
}
// sum of all digits - recursive
function sumDigits(num) {
	if (num < 10) return num;
	return (num % 10) + sumDigits(Math.floor(num / 10));
}






//																					React
//Race conditions can happen when multiple async requests are running and an older response arrives after a newer one
useEffect(() => {
  const controller = new AbortController();

  const load = async () => {
    try {
      const res = await fetch(`/api/search?q=${query}`, {
        signal: controller.signal,
      });

      const data = await res.json();
      setData(data);
    } catch (error) {
      if (error.name !== 'AbortError') {
        setError(error);
      }
    }
  };

  load();

  return () => controller.abort();
}, [query]);

// IntersectionObserver -infinite scroll, lazy loading img
useEffect(() => {
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) loadMore();
  });

  observer.observe(ref.current);
  return () => observer.disconnect();
}, []);

//ResizeObserver -show height and width of the elem in real time
import { useEffect, useRef, useState } from "react";
export function ResizeBox() {
  const ref = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver(entries => {
      const entry = entries[0];
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <div
        ref={ref}
        style={{
          resize: "both",
          overflow: "auto",
          padding: 20,
          border: "1px solid #ccc",
          width: 200,
          height: 150
        }}
      >
        Resize me!
      </div>

      <p>Width: {size.width}px</p>
      <p>Height: {size.height}px</p>
    </div>
  );
}

//Render Props / Children‑as‑a‑Function
function Fetch({ url, children }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url).then(r => r.json()).then(setData);
  }, [url]);

  return children(data);
}
<Fetch url="/api/user">
  {data => data ? <UserCard user={data} /> : <Spinner />}
</Fetch>






