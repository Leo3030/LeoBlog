---
title: 手写继承
date: 2024-02-20
tags: [js, "面试"]
---

```js
function Person() {
  // this.getName = function() {...}：这是在构造函数 Person 内部定义的方法。
  // 当使用 new 关键字创建 Person 的实例时，每个实例都会拥有自己的 getName 方法。
  // 这种方式创建的方法会占用更多内存，因为每个实例都会有自己的方法副本。
  // 这里属于实例属性
  this.getName1 = function () {
    console.log("get Name1");
  };
}

// Person.getName = function() {...}：这是直接将 getName 方法赋给了构造函数 Person 本身，而不是它的实例。
// 这种方式创建的方法是静态的，它属于构造函数本身，而不是实例。
// 因此，它不会被实例继承，也不会在实例化时创建新的方法副本。
// 这里属于 构造函数的静态属性，
Person.getName2 = function () {
  console.log("get Name2");
};
// 总结：第一个方法是每个实例独有的，而第二个方法是属于构造函数本身的静态方法。

Person.prototype.getName3 = function () {
  console.log("get Name3");
};

function Child() {
  Person.call(this);
  // this.name = Person.prototype.name;
  // console.log('Person.prototype: ', Person.prototype);
}

const extend = () => {
  const person1 = new Person();
  person1.age = 30;
  // console.log(new Person());
  console.log(1, Person.prototype);
  console.log(2, person1);
  console.log(3, person1.__proto__);
  // console.log(person1.getName());
  // console.log('Child.prototype: ', Child.prototype);
  // const child1 = new Child();
  // console.log('child1: ', child1);
  // console.log(child1.name);
  // const child2 = new Child();
  // child2.name.push('ryan');
  // console.log(child2.name);
  // console.log(child1.name);
};

export default extend;
```
