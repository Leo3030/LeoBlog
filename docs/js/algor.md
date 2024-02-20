---
title: 手写防抖和截流
date: 2024/2/20
tags: ["js", "面试"]
sidebar: auto
---

## 防抖

```js
//debounce

function myDebounce(func, time) {
  let timer;

  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func();
    }, time);
  };
}
```

## 截流

```js
//throttle
function myThrottle(func, time) {
  let timer;
  let lastRun;

  return function () {
    if (!lastRun) {
      func();
      lastRun = new Date();
    } else {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const now = new Date();
        if (now - lastRun >= time) {
          func();
          lastRun = now;
        }
      }, time - (now - lastRun));
    }
  };
}
```
