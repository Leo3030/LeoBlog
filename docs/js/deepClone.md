---
  title: DeepCopy & 柯里化
  date: 2024-02-22
  tag: [js, "面试"]
---
```js
//deepcopy

const obj = {
	a: { b: {c: 1}}
}

// 防止陷入自己调用的循环
// 复制方法
// symbols
function deepCopy(obj, cache = new WeakMap) {
	// if obj is not object return obj
	if (typeof obj !== 'object') {
		return obj;
	}

	if (cache.has(obj)) {
		return cache.get(obj)
	}
	

	const newObj = Array.isArray(obj) ? []: {};
	cache.set(obj,newObj)

	Object.keys(obj).map(key => {
		if (obj.hasOwnProperty(key)) {
			if (typeof obj[key] === 'function') {
				newObj[key] = obj[key]
			} else {
				newObj[key] = deepCopy(obj[key], cache)
			}
			
		}
		
	})

	//Symbols
	const symbols = Object.hasOwnPropertySymbols(obj);
	symbols.map(symbol => {
		newObj[symbol] = deepCopy(obj[key], cache)
	})

	return newObj;
}


add(1)(2)(3)

function add (x) {
	return function(y) {
		return function (z) {
			return x+y+z
		}
	}
}

function curry(fn, ...args) {
console.log(fn);
console.log(args);
	if (fn.length <= args.length) {
		return fn(...args)
	} else {
		return (...args) => curry(fn, ...args, ...args)
	}
}

const curry = (fn, ...args) => {
	console.log(111, args.length)
	console.log(2, fn.length)
    // 函数的参数个数可以直接通过函数数的.length属性来访问
    return args.length >= fn.length // 这个判断很关键！！！
    // 传入的参数大于等于原始函数fn的参数个数，则直接执行该函数
    ? fn(...args)
    /**
     * 传入的参数小于原始函数fn的参数个数时
     * 则继续对当前函数进行柯里化，返回一个接受所有参数（当前参数和剩余参数） 的函数
    */
    : (..._args) => curry(fn, ...args, ..._args);	
}
	

function add1(x, y, z) {
    return x + y + z;
}
const add = curry(add1);
console.log(add(1, 2, 3));
console.log(add(1)(2)(3));
console.log(add(1, 2)(3));
console.log(add(1)(2, 3));



const add = X => y => z => x+y+z

```