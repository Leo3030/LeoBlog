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

### `instanceof`

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
function Person() {}
const person1 = new Person();

person1 instanceof Person; // true
person1.__proto__.constructor === Person; // true
```

## 获取安全的`undefined`值

因为`undefined`是一个标识符，不是保留字，所以可以被当作变量来使用和赋值。

`void _`没有返回值，所以返回的是`undefined`，可以用来获取安全的`undefined`值。

```js
void 0; //undefined
```

## `Object.is()` 和 `===`、`==`的区别

- 使用`==`进行判断时，如果两边类型不一致，会进行类型转换，再进行比较
- 使用`===`进行判断时，如果两边类型不一致，直接返回 false
- `Object.is()`与`===`的行为基本一致，但是有两个区别
  - `Object.is(+0, -0)`返回`false`
  - `Object.is(NaN, NaN)`返回`true`

## JavaScript 中的包装类型

- 基本数据类型没有属性和方法，如果要使用属性和方法，需要将基本数据类型转换为包装类型
  - 为了方便操作基本类型的值，在调用基本类型的属性或方法是，会自动创建一个包装类型的对象，然后调用对象的属性或方法，最后销毁这个对象
  ```js
  const str = "abc";
  str.length; //3
  str.toUpperCase();
  ```
  - 可以使用`Object`函数现实创建包装类型的对象
  ```js
  var str = "cell";
  var strObj = Object(str);
  strObj instanceof String; //true
  ```
  - 可以使用 `valueOf` 方法获取包装类型对象的值
  ```js
  var str = "cell";
  var strObj = Object(str);
  strObj.valueOf(); // 'cell'
  ```

## 为什么会有`BigInt`

JavaScript 中的`Number`类型使用 64 位二进制表示，其中 1 位表示符号位，11 位表示指数位，身下的 52 位表示尾数位，所以`Number`类型的最大值为 `Number.MAX_SAFE_INTEGER`， 即 `2^53 -1`。

在这个范围内，可以保证所有的整数都是精确的，但是超出这个范围的整数，就无法精确表示了，所以就有了`BigInt`。

用例：

```js
Number.MAX_SAFE_INTEGER; // 9007199254740991

9007199254740992 === 9007199254740993; // true

9007199254740992n === 9007199254740993n; // false
```

## 判断空对象

- `Object.keys(obj).length === 0`
- `JSON.stringfy(obj) === {}`

## `const`对象属性可以修改吗

`const`用于声明常量，声明后不可修改，但是如果声明的是一个对象，则索引不能修改，但是对象的属性是可以修改的。其本质是保证变量指向的内存地址不变，而对象修改属性并不会改变内存地址。

## `new`操作符的过程

- 创建一个新的空对象
- 将构造函数的作用域赋给新对象（因此 this 就指向了这个新对象）
  - 即将新对象的 **proto** 指向构造函数的 prototype
- 执行构造函数中的代码（为这个新对象添加属性）
- 返回新对象

### 实现

```js
function tinyNew(fn) {
  const obj = {};
  obj.__proto__ = fn.prototype;
  const arr = new Array(...arguments);
  const result = fn.call(obj, arr[1]);

  return typeof result === "object" ? result : obj;
}

function Person(name) {
  this.name = name;
}
Person.prototype.sayName = function () {
  console.log(this.name);
};

const p = tinyNew(Person, "Tom");
p.sayName(); // Tom
```

### `new`箭头函数会报错么

剪头函数没有`prototype`属性，也没有 `this`，不能使用 `arguments`，所以不能使用 `new`。

### 箭头函数的`this`

箭头函数是没有`this`，所以箭头函数中的`this`捕获的是它所在上下文的`this`:

通过 Babel 编译理解箭头函数的`this`:

```js
// ES 6
const obj = {
  getName() {
    return () => {
      console.log(this === obj);
    };
  },
};
```

编译后：

```js
//ES5
var obj = {
  getName: function getName() {
    var _this = this;

    return function () {
      console.log(_this === obj);
    };
  },
};
```

## 扩展运算符

### 对象扩展运算符

- 用于取出对象中所有可遍历属性，拷贝到当前对象中去

```js
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 };
```

相当于：

```js
const obj1 = { a: 1, b: 2 };
const obj2 = Object.assign({}, obj1, { c: 3 });
```

### 数组扩展运算符

- 用于取出数组中的所有元素，拷贝到当前数组中

```js
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];
```

## Proxy

`Proxy` 用于修改某些操作的默认行为，等同于在语言层面作出修改，属于一种元编程，即对编程语言进行编程。

在 Vue 3.0 中，使用 `Proxy` 替换了 `Object.defineProperty`,实现了响应式数据。

使用 `Proxy` 实现数据响应式：

```js
const onWatch = (obj, setBind, getLogger) => {
  const handler = {
    get(target, property, receiver) {
      getLogger(target, property);
      if (typeof target[property] === "object" && target[property] !== null) {
        return new Proxy(target[property], handler);
      } else {
        return Reflect.get(target, property, receiver);
      }
    },
    set(target, property, value, receiver) {
      setBind(value, property);
      return Reflect.set(target, property, value);
    },
  };

  return new Proxy(obj, handler);
};

const p = {
  name: "Cell",
};

const pProxy = onWatch(
  p,
  (v, property) => {
    console.log(`监听到属性${property}改变为${v}`);
  },
  (target, property) => {
    console.log(`'${property}' = ${target[property]}`);
  }
);

pProxy.name = "Leo";
// 监听到属性name改变为Cellinlab
console.log(pProxy.name);
// 'name' = Leo
// 'Leo'
```

## Javacript 脚本延迟的方式

- `defer`
  - 脚本加载与文档解析同步，文档解析完毕之后执行，取保页面渲染不会被阻塞
  - 多个 `defer`脚本按照加载顺序执行
- `aysnc`
  - 异步加载，不回阻塞文档解析，脚本加载完毕后立即执行，如果此时文档解析完毕，会阻塞文档解析
  - 多个`async`脚本无法保证加载顺序，谁先加载完谁先执行
- js 动态创建 DOM 加载
  - 创建`script`标签，设置`src`属性，插入到`head`标签中
  - 可以对文档加载事件进行监听，当文档加载完毕后，在动态创建`script`标签
- `setTimeout`方式
  - 使用`setTimeout`延迟执行脚本，确保页面渲染不会被阻塞
- 放到`body`底部
  - 将`script`标签放在`body`标签的最后，确保页面渲染不会被阻塞

## BOM 和 DOM

- DOM (Document Object Model, 文档对象模型)
  - DOM 是 W3C 组织推荐的处理可扩展标记语言的标准编程接口
  - DOM 将文档解析为一个由节点和对象（包含属性和方法的对象）组成的结构集合
  - 通过 DOM 提供的 API，可以对 DOM 结构进行操作
- BOM （Browser Object model，浏览器对象模型）
  - BOM 定义了与浏览器进行交互的方法和接口
  - 核心是`window`对象，他表示浏览器的一个实例

## `encodeURI`、`encodeURIComponent`

- ` encodeURI`` 对整个 URI 进行编码，不会对本身属于 URI 的特殊字符进行编码，例如  `:、/、?、#、@` 等
- `encodeURIComponent` 对 URI 中的某一段进行编码，会对它发现的任何非标准字符进行编码

## Ajax

Ajax (Asynchronous JavaScript and XML， 异步的 JavaScript 和 XML) 是一种无需重新加载整个网页的情况下，能够更新部分网页的技术。

```js
function ajax(url, method) {
  const xhr = new XMLHttpRequest();
  xhr.open(method, url, true);
  xhr.onreadystatechange = function () {
    if (xhr.status === 200) {
      console.log(xhr.responseText);
    }
  };
  xhr.send(null);
}
```

## ES6 模块 和 CommonJS 模块

- ES6 Module 又称 ESM
  - 通过 `import` 引入模块，通过`export`导出模块
  - 是对模块的引用
- CommonJS
  - 通过`require`引入模块，通过`module.exports` 导出模块
  - 是对模块的浅拷贝

## `for...in`和`for...of`

- `for...in`
  - 用于遍历对象的可枚举属性，包括原型链上的属性
- `for...of`
  - 用于遍历可迭代对象，包括数组、字符串、Set、Map 等
  - 不能直接遍历对象，因为对象不是可迭代对象

## 原型、原型链

- 原型
  - 每个函数都有一个 `prototype` 属性，指向一个对象这个对象就是原型
  - 原型中有个 `constructor`属性，指向函数本身
- 原型链
  - 当访问一个对象的属性是，如果对象本身没有这个属性，就会去他的原型中查找，如果原型中也没有这个属性，就会去原型的原型中查找，知道找到`Object.prototype`,这个过程就是原型链
  - 原型链的尽头是`Object.prototype`,它的原型是 `null`

```js
function Person() {}
const p = new Person();

p.__proto__ === Person.prototype; // true
Person.prototype.__proto__ === Object.prototype; // true
Object.prototype.__proto__ === null; // true

Person.prototype.constructor === Person; // true
```

## 作用域、作用域练

### 作用域

- 全局作用域
  - 所有为定义直接赋值的变量会自动声明为全局作用域的变量
  - 全局作用域有很大的弊端，会造成变量污染，所以在实际开发中，精良避免使用全局作用域
- 函数作用域
  - 函数内部定义的变量拥有函数作用域
  - 函数作用域可以保护变量不受外界干扰，避免变量污染
- 快级作用域
  - ES6 新增了`let`和`const`关键字，用于声明块级作用域的变量
    - `let`和`const`声明的变量不会有变量提升，也不可以重复声明
  - 块级作用域可以保护变量不受外界干扰，避免变量污染
  - 块级作用域可以在函数中创建，也可以在`{}`中创建

:::tip
作用域是分层的，内层作用域可以访问外层作用域，反之不行
:::

### 作用域链

- 作用域链是由多个执行上下文变量对象组成，他们通过`[[Scope]]`属性相互关联
- 作用域链的尽头是全局执行上下文的变量对象，它的`[[Scope]]`属性值为`null`
- 作用域链的查找是从当前执行上下文的变量对象开始，如果没有找到，就会沿着 `[[Scope]]`属性向上查找，直到找到全局执行上下文的变量对象，如果还没有找到，就会报错
- 作用域链的作用是保证对执行环境有权访问的所有变量和函数的有序访问

```js
var a = 1;
function foo() {
  var b = 2;
  function bar() {
    var c = 3;
    console.log(a + b + c);
  }
  bar();
}

foo(); // 6
```

### this

- `this`是执行上下文中的一个属性，他指向最后调用这个函数的对象
  对于每个执行上下文，都有三个重要属性

  - 变量对象(Variable object，VO)
  - 作用域链(Scope chain)
  - this

- Reference

  - Reference 的构成，由三个组成部分，分别是：
    - base value
    - referenced name
    - strict reference
  - base value 就是属性所在的对象或者就是 EnvironmentRecord，它的值只可能是 undefined, an Object, a Boolean, a String, a Number, or an environment record 其中的一种。

  - referenced name 就是属性的名称。

```js
var foo = 1;

// 对应的Reference是：
var fooReference = {
  base: EnvironmentRecord,
  name: "foo",
  strict: false,
};

var foo = {
  bar: function () {
    return this;
  },
};

foo.bar(); // foo

// bar对应的Reference是：
var BarReference = {
  base: foo,
  propertyName: "bar",
  strict: false,
};

var value = 1;

var foo = {
  value: 2,
  bar: function () {
    return this.value;
  },
};

//示例1
console.log(foo.bar()); // 2
//示例2
console.log(foo.bar()); // 2
//示例3
console.log((foo.bar = foo.bar)()); // 1
//示例4
console.log((false || foo.bar)()); // 1
//示例5
console.log((foo.bar, foo.bar)()); // 1
```

## call() 、apply() 、bind()

- call(), apply(), bind()都是用来改变原来`this`指向的
- call(), apply(), bind()的第一个参数都是用来指定函数`this`指向的

```js
function foo(msg) {
  console.log(this.name, this.age, msg);
}

const obj = {
  name: "Cell",
  age: 18,
};

foo.call(obj, "Hello"); // Cell 18 Hello

foo.apply(obj, ["Hello"]); // Cell 18 Hello

const bar = foo.bind(obj);
bar("Hello"); // Cell 18 Hello
```

## 异步编程

- 回调函数
  - 回调函数是一种处理异步操作的函数，通过将函数作为参数传递给其他函数，在异步完成时回调
  - 回调函数是异步编程的基础，但会导致回调地狱，代码难以维护，特别是当有多个嵌套的异步操作时
- `Promise`
  - `Promise`是 ES6 引入的一种处理异步操作的机制。他是一个对象，用于表示异步操作最终完成或者失败，并可以进行链式调用
  - 使用`Promise`可以避免回调地狱，但是有时任然会造成`thenn`链式调用，可能会显得代码难以维护
- `Genertor`
  - `Generator`是 ES6 新增的一种异步编程解决方案。它是一个状态机，可以暂停和恢复执行，封装了多个内部状态。通过使用`yield`关键字，可以实现在函数执行过程中暂停并在需要的时候恢复执行
- `async/await`
  - `async/await`是 ES7 新增的异步编程解决方案，它是对`Generator`的语法糖，使用起来更加简洁
  - 通过在函数前面加上`async`关键字，可以定义一个异步函数，其中可以使用`await`关键字来等待异步操作的结果
  - 使用`async/await`可以避免回调地狱`then`链式调用，而且代码更加的清晰易读

## `Promise`

### `Promise`的状态

- `Promise`是 ES6 引入的一种处理异步操作的机制。它是一个对象，用于表示异步操作的最终完成或失败，并可以进行链式调用
- `Peomise`有三种状态，分别是`pending`、`fulfilled/resolved`、`reject`
  - `pending`表示等待状态，既没有成功也没有失败
  - `fulfilled/resolved`表示成功状态
  - `reject`表示失败状态

### `Promise`的基本用法

- `Promise`的构造函数接受一个函数作为参数，这个函数的两个参数分别是`resolve`和`reject`，他们是两个函数，有 JavaScript 引擎提供，不用自己部署
  - `resolve`函数的作用是将`Promise`对象的状态从`peding`转换为 `fulfilled/resolved`，并将异步操作的结果作为参数传递出去
  - `reject`函数的作用是将`Promise`对象的状态从`pending`转换为`rejected`，并将异步操作的报出的错误作为参数传递出去
- `Promise`的`then()`方法接受两个参数，分别是 `onFulfilled`和`onRejected`，他们都是函数，分别在一步操作成功和失败时调用
  - `then()`返回一个新的 Promise 对象，所以可以进行链式调用
- `Promise`的`catch()`方法用于捕获错误，相当于`then(null, onRejected)`，它返回一个新的`Promise`对象，所以可以进行链式调用
- `Promise`的`finally()`方法用于指定不管`Promise`对象最后状态如何，都会执行的操作，他返回一个新的`Promise`对象，所以可以进行链式调用
- `Promise`的`all()`方法用于将多个`Promise`实例包装成一个新的`Promise`实例

### `Promise`的缺点

- 无法取消`Promise`，一旦新建它就会立即执行，中途无法取消
- 如果不设置回调函数，`Promise`内部抛出的错误，不会反映到外部
- 当处于`pending`状态是，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）

### `Promise`解决的问题

- 回调地狱
- 多个一步操作的并行执行和结果合并
- 多个异步操作的串行执行

:::warning
注意，在构造 ` Promise` 时，构造函数内部的代码是立即执行的，而 `then()` 方法中的回调函数是异步执行的。
:::

## `async/await`

`async/await`是 ES7 新增的异步编程解决方案，它是对`Generator`的语法糖，使用起来更加简洁。

```js
function timeout(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function asyncPrint(value, ms) {
  await timeout(ms);
  console.log(value);
}

asyncPrint("Hello World", 1000);
```

## 对象创建

### 对象字面量

```js
const person = {
  name: "Cell",
  age: 18,
  sayName() {
    console.log(this.name);
  },
};
```

### 工厂模式

- 原理是用函数来封装创建对象的细节，然后通过调用函数来创建对象
- 优点：解决了创建多个相似对象的问题
- 缺点：创建出来的对象无法和某个类型联系起来，即无法识别

```js
function createPerson(name, age) {
  const obj = {};
  obj.name = name;
  obj.age = age;
  obj.sayName = function () {
    console.log(this.name);
  };
  return obj;
}
const person = createPerson("Cell", 18);
```

### 构造函数模式

- JS 中每个函数都可以作为构造函数，只要通过`new`调用
- 执行构造函数的过程
- 会创建一个新的对象
- 然后将构造函数的作用域赋值给新对象，即`this`只想新对象，然后执行构造函数中的代码，为对象创建属性
- 如果函数返回一个对象，那么这个对象会取代整个构造函数的返回值，否则返回新对象
- 优点：解决了创建多个相似对象的问题，而且创建的对象和构造函数建立了联系，可以以此识别对象的类型
- 缺点：每个方法都要在每个实例额上重新创建一边，无法实现函数的复用

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.sayName = function () {
    console.log(this.name);
  };
}

const person = new Person("Cell", 18);
```

### 原型模式

- 每个函数都有一个`prototype`属性，指向一个对象，这个对象就是原型，它包含了可以由特定类型的所有实例共享的属性和方法
- 优点：可以让所有实例共享属性和方法，节省内存
- 缺点
  - 没有办法通过传入参数来初始化
  - 如果存在引用类型，会被所有实例共享，造成修改的混乱

```js
function Person() {}

Person.prototype.name = "Cell";
Person.prototype.age = 18;
Person.prototype.sayName = function () {
  console.log(this.name);
};

const person1 = new Person();
const person2 = new Person();
```

### 组合使用构造函数模式和原型模式

- 构造函数模式用于定义实例属性，原型模式用于定义方法和共享的属性
- 优点：既可以通过传入参数来初始化值，又可以让所有实例共享属性和方法，是最常用的方式
- 缺点：使用了两种不同的模式，对于代码的封装性不够好

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.sayName = function () {
  console.log(this.name);
};

const person1 = new Person("Cell", 18);
const person2 = new Person("Tom", 20);
```

## 对象继承

### 原型链继承

- 原理是让子类的原型等于父类的实例，从而实现继承父类的属性和方法
- 优点：可以继承父类的属性和方法
- 缺点
- 无法向父类构造函数传参
- 所有实例都会共享父类的属性和方法，无法实现多个实例对引用类型属性的独立修改

```js
function Parent() {
  this.name = "Cell";
}

Parent.prototype.sayName = function () {
  console.log(this.name);
};

function Child() {}

Child.prototype = new Parent();
Child.prototype.constructor = Child;

const child = new Child();
```

### 构造函数继承

- 原理是在子类构造函数中调用父类构造函数，通过 `call()` 或者 `apply()` 实现
- 优点：可以向父类构造函数传参，可以实现多个实例对引用类型属性的独立修改
- 缺点：无法继承父类原型上的属性和方法

```js
function Parent(name) {
  this.name = name;
}

function Child(name) {
  Parent.call(this, name);
}

const child = new Child("Cell");
```

### 组合继承

- 原理是将原型链继承和借用构造函数继承组合起来
  - 通过原型链实现对原型属性和方法的继承
  - 通过借用构造函数实现对实例属性的继承
- 优点：可以继承父类原型上的属性和方法，可以向父类构造函数传参，可以实现多个实例对引用类型属性的独立修改
- 缺点：调用了两次父类构造函数，生成了两份实例

```js
function Parent(name) {
  this.name = name;
}

Parent.prototype.sayName = function () {
  console.log(this.name);
};

function Child(name, age) {
  Parent.call(this, name);
  this.age = age;
}

Child.prototype = new Parent();
Child.prototype.constructor = Child;

const child = new Child("Cell", 18);
```

### 原型式继承

TODO:

### 寄生式继承

TODO:

### 寄生组合式继承

TODO:

## 内存泄露

- 内存泄露是指不再用到的内存没有及时释放，造成内存的浪费
- 可能出现内存泄露的情况
- 意外的全局变量
- 被遗忘的计时器或回调函数
- 闭包
- 脱离 DOM 的引用
- 未销毁的 Web Worker 或者子进程
