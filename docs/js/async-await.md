---
title: 手写async/await
date: 2024/2/20
tags: ["js", "面试"]
---

## async/await

`async/await`是 ES7 新增的异步编程解决方案，它是对`Generator`的语法糖，使用起来更加简洁，以下是利用`Generator`手写一个`async/await`

```js
function asyncToGenerator(generatorFunc) {
  return function () {
    const generator = generatorFunc.apply(this);

    return new Promise((resolve, reject) => {
      function step(key, arg) {
        let generatorResult;
        try {
          generatorResult = generator[key](arg);
        } catch (error) {
          return reject(error);
        }
        const { value, done } = generatorResult;
        console.log("value", value);
        if (done) {
          return resolve(value);
        } else {
          return Promise.resolve(value).then((val) => step("next", val));
        }
      }

      step("next");
    });
  };
}

function resolveAfter2Seconds() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("resolved");
    }, 2000);
  });
}

const asyncFunc = asyncToGenerator(function* () {
  console.log("calling");
  const result = yield resolveAfter2Seconds();
  console.log(result);
});

asyncFunc();
```
