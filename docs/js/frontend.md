---
title: 前端面试 - 基础知识
date: 2024/2/22
tags: ["面试", "frontend"]
sidebar: auto
---

## Ajax axios 的区别

这两个都是用来实现异步请求的
不同的点在于：

- Ajax 是基于 XMLHttpRequest 的；
- Axios 是基于 promise 的；

## 水平垂直居中的方式

- `lineHeight`等于容器的高度（仅针对文字）
- `table` 适用于邮件等情况，通常不推荐
- `flex` 布局 `juestify-content:center`:
- `position:absolure;`+`top: 50%` + `transform: translateY(-50%);`使用绝对定位

通常 `flex`布局和`position`定位的水平垂直居中比较常见

## 常用的伪元素和伪类

- 伪类：伪类用于选择元素的特定状态或者特定关系，并且通常以单冒号`:`开头。
  - `:hover`
  - `:first-child`
  - `:last-child`
- 伪元素：伪元素用于在文档中的特定位置插入内容，并且通常以双冒号`::`开头。
  - `::before`
  - `::after`
  - `::placeholder`

## 移动端如何适配不同屏幕尺寸

- `width`用相对布局 `%`，`rem`之类
- 如果是要做到手机、桌面、平板不同尺寸可以使用可以使用`@media only screen and (min-width: %size%) {}`
- 字体使用 rem 作为单位

## 本地存储用哪些，有什么区别

- cookie：cookie 的属性有 name，value，domain，expire，有域名和失效时间的限制，常用于记录用户的 token 等信息，有大小限制，4-5KB 之间？
- localStorage：localStorage 是以键值对存储在浏览器本地的，没有过期时间的限制，常用于记录用户行为，如上次访问信息之类
- sessionStorage： sessionStorage 和 localStorage 类似，区别是 session 断开数据消失

## JS 的数据类型，如何判断 JS 的数据类型

- `String`
- `Number`
- `Null`
- `Undefined`
- `Object`
- `Boolean`
- `Symbol` (ES6)
- `BigInt` (ES10)

基本类型使用`typeof`

```js
typeof "1"; // string
typeof 1; // number
typeof true; // boolean
typeof undefined; // undefined
```

引用类型使用`instanceof`

```js
[] instanceof Array; // true
const a = new Object();
a instanceof Object; // true
```

其余引用类型：`Array`、`Date`、`Error`、`RegExp`、`Error`、`Function`

## ES6 的新特性

- `Symbol`
- 箭头函数
- `class`
- 解构赋值
- `Set`,`Map`
- `let`, `const`
- 默认参数
- 展开运算符
- 模版字符串
- 剩余参数
- `Promise`对象
- 模块化

## `let`，`const`，`var`的区别

这三者都可以用来声明变量

- `let`，`const`都是块级作用域, 而`var`不是
- `var`存在变量提升，而`let`和`const`则没有
- `let`和`const`写在函数里会导致临时死区，如果没有定义就是用会导致报错
- `let`和`var`都可以用于定义变量，可以改变
- `const`用于定义常量，索引不能变

## 数组去重的方式

```js
// 1. Set
const a = [1, 2, 3, 2, 1];

const b = Array.from(new Set(a));
console.log(b); //[1,2,3]

// 2.循环去重
function uniqueArray(arr) {
  const newArr = [];

  a.map((v) => {
    if (newArr.indexOf(v) === -1) {
      newArr.push(v);
    }
    return true;
  });

  return newArr;
}
const c = uniqueArr(a);
console.log(c); // [1,2,3]
```

## 深拷贝和浅拷贝，实现一个深拷贝

- 浅拷贝，复制对象的索引，优点是省内存，缺点是如果该对象的属性发生了改变，会导致复制的对象也发生改变，导致问题很难被排查
- 深拷贝，不单单指复制对象的索引，连对象内部所有属性都拷贝了一份，优点对象和复制的对象互不影响，缺点占内存

```js
const a = { a: { b: { c: 1 } } };

function deepCopy(obj) {
  if (typeof obj !== "object") {
    return obj;
  }

  const newObj = {};

  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = deepCopy(obj[key]);
    }
  }

  return newObj;
}
```

:::tip
这只是简单的 deepCopy 实际工作中会遇到各种复杂的情况，比如说 有 symbol 属性，function 属性，对象自己的循环调用等等，推荐使用成熟的第三方插件来实现该功能，比如说 lodash 之类的
:::

## 组件的通讯方式有哪些

- 父与子通信：利用 props 传入子组件
- 子与父通信：通过 callback 的形式，在子组件里调用父组件传入的 callback 来实现
- 兄弟组件通信：通过父组件的 state 以及 setState，分别传入到两个组件里面，通过 setState 修改父组件里面的 state 值来进行兄弟组件之间的通信
- 跨层级组件通信：
  - 如果是简单数据通信，可以通过 Context 来实现
  - 如果是复杂数据的通信，则需要借助第三方工具，如 Redux 来实现

## 防抖和截流

```js
// 防抖
function dedounce(func, delay) {
  let timer = null;

  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func();
    }, delay);
  };
}

// 截流
function thottle(func, time) {
  let timer;
  let lastRun;

  return function () {
    if (!lastRun) {
      func();
      lastRun = new Date();
    } else {
      clearTimeout(timer);
      const now = new Date();

      setTimeout(() => {
        if (now - lastRun > time) {
          func();
          lastRun = new Date();
        }
      }, time - now + lastRun);
    }
  };
}
```

## 登陆拦截怎么实现

在根组件也就 `<App/>`里面增加判断，如果`token`存在，则走正常流程，如果`token`不存在，则跳转到登陆页面

## 闭包是什么

闭包简单点来说就是让内部函数能访问外部函数的自由变量
具体形式：

```js
  function () {
    let a = 1
    return (function () {console.log(a)})(a)
  }
```

闭包会导致闭包内的元素不会被垃圾回收，导致占用内存

## url 到浏览器的一个过程有哪些步骤

- 请求 DNS 服务器，获取服务器 ip 地址
- 访问服务器，（三次挥手），建立连接
- 请求数据
- 处理响应数据
- 渲染页面
- 关闭连接

## 什么是 JS 原型，原型链是什么

每个对象都有个`__proto__`属性，指向自己的原型
对象的类有个`prototype`属性指向其原型
原型也是一个对象

原型链就是当一个属性在该对象上没有的时候，会去原型中查找，如果原型中也没有，则会去原型的原型中查找，这个过程就叫做原型链

## 作用域是什么

作用域分为：

- 全局作用域：作用域全局范围
- 块级作用域：类似`for`,`while`只在某一块功能的作用域
- 函数作用域：函数内部的作用域

作用域链：即一个变量如果在当前作用域找不到，会往上级作用域查找，直到全局作用域，如果全局作用域也没有，则报错

## 数组的操作方式：

- `push`: 增加，会改变原数组
- `splice`: 替换指定内容，会改变原数组
- `slice`: 将数组切片返回，并不会改变原数组
- `pop`: 从数组中删除最后一个元素并返回
- `shift`: 从数组中删除第一个元素并返回

## 0.1 + 0.2 === 0.3 么，为什么，如何解决

因为 js 在计算中会转换成二进制，在二进制中，0.1 和 0.2 都是无限循环小数，所以无法等于 0.3
解决方案：

```js
console.log((0.1 + 0.2).toFixed(1)); // 0.3
```

## 判断变量是数组

```js
Array.isArray(arr);
arr instanceof Array;
```

## 判断变量是对象

```js
obj instanceof Object;
obj.__proto__.constructor === "object";
variable !== null && typeof variable === "object";
```

## Set/Map 是什么

- `Set`是 ES6 新增的，用于存储值，`Set`的值具有唯一性，通过 add 的方式添加，delete 的当时删除
- `Map`同样是 ES6 新增的，用于存储键值对，通过 `set()`，`get()`的方式存储和获取，其中`Map`的`key`具有唯一性

## 如何让改变函数的上下文

可以使用`apply`，`call`来改变函数的上下文，这两个都是用来改变 this 的指向，apply 第二个参数是一个数组，call 则是多个参数

## `useCallback()`，`useMemo()`

- `useCallback()` 缓存一个方法，两个参数，第一个参数是`func`， 第二参数是`dependence`
- `useMemo()` 缓存一个值，两个参数，第一个参数是`value`, 第二个参数是`dependence`
- `useCallback()`需要配合`memo`使用，因为组件`render`的时候会重新创建`func`，
  每次 func 的索引都会改变，使用`useCallback()`能缓存这个方法，让组件可以缓存住

```js
import {useCallBack,memo} from 'react';
/**父组件**/
const Parent = () => {
    const [parentState,setParentState] = useState(0);  //父组件的state

    //需要传入子组件的函数
    const toChildFun = useCallBack(() => {
        console.log("需要传入子组件的函数");
        ...
    },[])

    return (<div>
          <Button onClick={() => setParentState(val => val+1)}>
              点击我改变父组件中与Child组件无关的state
          </Button>
          //将父组件的函数传入子组件
          <Child fun={toChildFun}></Child>
    <div>)
}

/**被memo保护的子组件**/
const Child = memo(() => {
    consolo.log("我被打印了就说明子组件重新构建了")
    return <div><div>
})
```

## useRef

`useRef`的主要用法包括：

- 访问 DOM 元素：通过将 ref 属性赋值为 useRef 创建的 ref 对象，可以轻松地访问和操作 DOM 元素。

```js
mport React, { useRef } from 'react';

function MyComponent() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}
```

- 保存组件之间的状态：通过 ref 对象，在组件之间共享和保持状态，而无需触发重新渲染。

```js
import React, { useRef } from 'react';

function MyComponent() {
  const sharedData = useRef({ count: 0 });

  const incrementCount = () => {
    sharedData.current.count++;
    console.log(sharedData.current.count);
  };

  return (
    <div>
      <button onClick={incrementCount}>Increment Count</button>
    </div>
  );
```

- 保存定时器或其他引用：可以使用 useRef 来保存定时器、WebSocket 连接等引用，以便在组件卸载时清除这些引用。

```js
import React, { useRef, useEffect } from "react";

function MyComponent() {
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      console.log("Timer is running");
    }, 1000);

    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  return <div>Timer Component</div>;
}
```
