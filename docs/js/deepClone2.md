---
title: Deep Copy进阶
date: 2024-02-24
tags: ["js"]
---

## Deep Copy进阶
```js
// Q: 深拷贝需要注意哪些问题

// A: 在进行深拷贝时，需要注意以下几个问题：
// =====================================
// 循环引用：如果对象内部存在循环引用，简单的递归拷贝可能会导致无限循环，因此需要对循环引用进行特殊处理，或者使用标记来跟踪已经拷贝过的对象。
function deepCopyWithCircular(obj, cache = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') {
      return obj;
  }

  if (cache.has(obj)) {
      return cache.get(obj);
  }

  let copy = Array.isArray(obj) ? [] : {};
  cache.set(obj, copy);

  for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
          copy[key] = deepCopyWithCircular(obj[key], cache);
      }
  }

  return copy;
}

// 示例
let obj = { a: 1 };
obj.b = obj; // 创建循环引用

let objCopy1 = deepCopyWithCircular(obj);
console.log(objCopy1); // 输出: { a: 1, b: [Circular] }

// WeakMap 是 JavaScript 中的一种数据结构，它是 ES6 新增的一种 Map 类型，用于存储键值对。与普通的 Map 不同，WeakMap 的键只能是对象，并且键是弱引用，不会阻止对象被垃圾回收。

// WeakMap 主要有以下特点：

// 键必须是对象，值可以是任意类型。
// 键是弱引用，不会阻止键对象被垃圾回收。
// WeakMap 没有遍历方法，因为无法保证对象何时被垃圾回收。
// 由于键是弱引用，WeakMap 是不可枚举的（无法通过 for...of 或 forEach 方法遍历）。
// WeakMap 在某些情况下非常有用，特别是在需要存储对象与元数据之间的映射关系，并且不希望这些映射关系影响对象的垃圾回收时。
// =====================================

// 原型链：在拷贝对象时，需要考虑原型链上的属性和方法，确保它们也被正确地拷贝。

function deepCloneWithPrototype(obj, cache = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') {
      return obj;
  }

  if (cache.has(obj)) {
      return cache.get(obj);
  }

  let clone = Array.isArray(obj) ? [] : Object.create(Object.getPrototypeOf(obj));

  cache.set(obj, clone);

  for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
          clone[key] = deepCloneWithPrototype(obj[key], cache);
      }
  }

  return clone;
}

// 示例
function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function() {
  console.log(`Hello, my name is ${this.name}.`);
};

let person1 = new Person('Alice');
let person2 = deepCloneWithPrototype(person1);

person1.sayHello(); // 输出: Hello, my name is Alice.
person2.sayHello(); // 输出: Hello, my name is Alice.

// 不可枚举属性：一些对象的属性可能是不可枚举的，这些属性在默认情况下可能会被忽略，因此需要特殊处理。
function deepCloneWithNonEnumerableProperties(obj, cache = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') {
      return obj;
  }

  if (cache.has(obj)) {
      return cache.get(obj);
  }

  let clone = Array.isArray(obj) ? [] : Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));

  cache.set(obj, clone);

  for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
          clone[key] = deepCloneWithNonEnumerableProperties(obj[key], cache);
      }
  }

  return clone;
}

// 示例
let obj2 = { a: 1 };
Object.defineProperty(obj2, 'b', {
  value: 2,
  enumerable: false  // 不可枚举属性
});

let objCopy2 = deepCloneWithNonEnumerableProperties(obj2);
console.log(objCopy2); // 输出: { a: 1, b: 2 }

// 特殊对象：对于一些特殊对象（如 RegExp、Date、Map、Set 等），需要根据其特性进行特殊处理。
function deepCloneSpecialObjects(obj, cache = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') {
      return obj;
  }

  if (cache.has(obj)) {
      return cache.get(obj);
  }

  let clone;

  if (obj instanceof RegExp) {
      clone = new RegExp(obj);
  } else if (obj instanceof Date) {
      clone = new Date(obj.getTime());
  } else if (obj instanceof Map) {
      clone = new Map(Array.from(obj, ([key, value]) => [key, deepCloneSpecialObjects(value, cache)]));
  } else if (obj instanceof Set) {
      clone = new Set(Array.from(obj, value => deepCloneSpecialObjects(value, cache)));
  } else {
      clone = Array.isArray(obj) ? [] : Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
  }

  cache.set(obj, clone);

  for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
          clone[key] = deepCloneSpecialObjects(obj[key], cache);
      }
  }

  return clone;
}

// 示例
let map = new Map();
map.set('key1', { a: 1 });
map.set('key2', { b: 2 });

let mapCopy = deepCloneSpecialObjects(map);
console.log(mapCopy.get('key1')); // 输出: { a: 1 }
console.log(mapCopy.get('key2')); // 输出: { b: 2 }

// Symbol 属性：Symbol 类型的属性在默认情况下可能会被忽略，因此需要考虑如何处理 Symbol 属性。
function deepCloneWithSymbols(obj, cache = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') {
      return obj;
  }

  if (cache.has(obj)) {
      return cache.get(obj);
  }

  let clone = Array.isArray(obj) ? [] : {};

  cache.set(obj, clone);

  // 复制普通属性
  for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
          clone[key] = deepCloneWithSymbols(obj[key], cache);
      }
  }

  // 复制 Symbol 属性
  const symbols = Object.getOwnPropertySymbols(obj);
  for (let symbol of symbols) {
      clone[symbol] = deepCloneWithSymbols(obj[symbol], cache);
  }

  return clone;
}

// 示例
const symbol1 = Symbol('symbol1');
const symbol2 = Symbol('symbol2');
const obj3 = {
  a: 1,
  [symbol1]: 'Symbol 1',
  [symbol2]: 'Symbol 2'
};

const objCopy3 = deepCloneWithSymbols(obj3);
console.log(objCopy3); // 输出: { a: 1, Symbol(symbol1): 'Symbol 1', Symbol(symbol2): 'Symbol 2' }

// 函数属性：对于函数属性，需要考虑是否需要拷贝函数本身，或者只是拷贝函数的引用。
function deepCloneWithFunctions(obj, cache = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') {
      return obj;
  }

  if (cache.has(obj)) {
      return cache.get(obj);
  }

  let clone = Array.isArray(obj) ? [] : {};

  cache.set(obj, clone);

  // 复制普通属性和函数属性
  for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
          if (typeof obj[key] === 'function') {
              // 如果属性是函数，则直接赋值
              clone[key] = obj[key];
          } else {
              // 如果属性是对象，则递归拷贝
              clone[key] = deepCloneWithFunctions(obj[key], cache);
          }
      }
  }

  return clone;
}

// 示例
const obj4 = {
  a: 1,
  b: function() {
      console.log('Function b');
  }
};

const objCopy4 = deepCloneWithFunctions(obj4);
console.log(objCopy4); // 输出: { a: 1, b: [Function: b] }
objCopy4.b(); // 输出: Function b


// 性能：深拷贝可能会涉及到大量的递归操作，可能会影响性能，因此需要考虑如何优化深拷贝的性能。
// 第三方库 lodash 的 _.cloneDeep 方法

// 综上所述，在进行深拷贝时，需要综合考虑以上问题，并根据具体情况进行相应的处理，以确保拷贝结果符合预期。

```