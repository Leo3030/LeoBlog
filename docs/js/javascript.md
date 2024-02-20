---
title: 前端面试 - JavaScript
date: 2024/2/20
tags: [前端基础, 面试]
sidebar: auto
---

## JavaScript 数据类型

### 基本数据类型

- `Undefined`
- `Null`
- `Boolean`
- `Number`
- `String`
- `Object`
- `Symbol` (ES6 新增)
- `BigInt` (ES10 新增)

### 原始类型和引用类型

- 原始类型
  - 值存储在栈中
  - 占据空间小，大小固定，属于被频繁使用的数据
  - 拷贝时，会创建一个新副本
  - `Undefined`、`Null`、`Boolean`、`Numebr`、`String`、`Symbol`、`BigInt`
- 引用类型

  - 值存储在堆中，栈中存储索引
  - 占据空间大，大小不固定，如果存储在栈中，会影响程序运行的性能
  - 拷贝时，只会拷贝索引，需要深拷贝
  - `Object`、`Array`、`Function`、`Date`、`RegExp`、`Error`

### 栈和堆

操作系统中，内存分为栈区和堆区

- 栈区：用于存放基本数据，由编译器自动分配释放，存放函数的参数值、局部变量的值，其操作方式类似于数据结构中的栈
- 堆区：用于存放引用类型数据的值，一般由开发者分配释放，若开发者不释放，程序结束时可能由垃圾回收机制收回，分配方式类似于链表

## 数据类型检测

### `typeof`

- 用于检测基本数据类型，除了`null`，其他基本数据类型都可以检测
- 用于检测引用数据类型，除了`function`，其他引用数据类型都会返回`object`

```js
typeof undefined; // 'undefined'
typeof true; // 'boolean'
typeof 123; // 'number'
typeof "123"; // 'string'
typeof Symbol(); // 'symbol'
typeof BigInt(123); // 'bigint'

typeof null; // 'object'

typeof {}; // 'object'
typeof []; // 'object'
typeof function () {}; // 'function'
```

### instanceof

- 用于检测**对象**数据类型，可以检测出具体的引用数据类型
- 不能检测基本数据类型，但是可以检测基本数据类型的包装类型
- 原理是通过判断对象的原型链中是否能找到类型的`prototype`

```js
  2 instanceof Number; // false
  new Number(2) instanceof Number; // true

  [] instanceof Array; //true
  {} instanceof Object; //true
  function () {} instanceof Function; //true
```

#### 手写 instanceof

```js
1;
```
