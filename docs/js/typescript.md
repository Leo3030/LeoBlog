---
title: Typescript
date: 2024-02-24
tags: ["Typescript"]
---

## 类型推断

TypeScript 根据我们已书写的代码进行推断的方式，例如第一次赋值是 string，如果改成 number 就会报错，但并不建议使用，因为看起来不直观

```js
let str = "string";
str = 10; // 报错
```

## 类型注解

主动标明变量类型

```js
let str: string = "string";
```

## 类型断言

表示最后是 number，属于人工干预，需要谨慎使用

```ts
let numArr = [1, 2, 3];
const res = numArr.find((num) => num > 2) as number;
result * 5;
```

## 基础类型 & 联合类型

```ts
//基础类型
let v1: string = "abc";
let v2: number = 1;
let v3: boolean = true;
let nu: null = null;
let un: undefined = undefined;

// 联合类型
let v4: string | null = null;
let v5: 1 | 2 | 3 = 2; // 只能是1、2、3中的一个
```

## 数组、元组、枚举

### 数组

```ts
let numArr: number[] = [1, 2, 3];
let num2Arr: Array<string> = ["a", "b", "c"];
```

### 元组

```ts
let t1: [number, string, number?] = [1, "a", 2]; // ?代表可选
```

### 枚举

```ts
enum myEnum {
  A,
  B,
  C,
}

console.log(myEnum.A); // '0'
console.log(myEnum[0]); // 'A'
```

## 函数

### Void

表示函数没有返回值

### 函数

```ts
function myFunc(a = 10, b: number, c?: boolean, ...rest: number[]): number {
  return 100;
}
```

## 接口

通常用来定义对象

```ts
interface Obj {
  name: string;
  age: number;
}

const obj: Obj = {
  name: "leo",
  age: 30,
};
```

## 类型别名

```ts
type MyType = string | number | null;

let a: string | number | null;
let b: MyType; // a和b定义的类型是一样的
```

## 泛型

```ts
function myFunc(a: number, b: number): number[] {
  return [a, b];
} // 这里只能是number

function myFunc2<T>(a: T, b: T): T[] {
  return [a, b];
} //这里T代表一个类型
myFunc2<string>("a", "b"); // return ['a', 'b']
```
