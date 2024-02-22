---
  title: React介绍
  date: 2024-02-20
  tags: ['面试', 'react', 'js']
---
## 什么是React？

- React是一个js的库，一个前端的ui框架，通过组件化UI来解决图层开发复用的问题，本质是一个组件化的框架
- React的核心设计思路有三点
  - **申明式：** React通过申明组件的方式，更好的方便了项目的阅读，比起JQuery那种命令式的开发方式，申明式无疑更加的直观和便于组合
  - **组件化：** React通过组件化的方式，让视图的拆分和复用，更加的简单高效，做到了高内聚低耦合
  - **通用性：** React基于虚拟Dom来进行操作UI，所以可以在各种平台运行，比如说ios/android，小程序等等
- React的缺点：
  - 作为一个视图层的框架，React并没有提供一套完整的大型应用的解决方案。比如说页面的router，server等，需要依赖别的解决方案，比如说express..js或者next.js等等

## React为什么要用JSX 

### 官方定义
JSX是JS的语法拓展，或者是一个类似于XML的es语法拓展

::: tip
React官方并不强制使用JSX，也可以使用React.createElement来实现同样的功能，但是使用JSX的写法会比直接使用createElement更加简单，易读，JSX最后会通过babel转换成createElement，所以JSX更像是createElement的语法糖
:::

### 其他方案
  - 模版
  - 模版字符串

### 生命周期
  - 挂载
    - constructor （严格来说这个不算React的生命周期，这个是类的构造函数）
    - UNSAFE_componentWillMount (弃用)
    - componentDidMount (组件完成挂载是触发，适合写一些初始化异步调用后台数据的逻辑)
  - 更新
    - componentWillReceiveProps （弃用）
    - componentWShouldUpdate （更新前出发，能够阻止更新，节省不必要额资源，是优化的方向之一）
  - 卸载
    - componentWillMount （在组件卸载的时候触发，可以用于删除事件等操作）
  - 异常
    - componentCatchError（用于处理因为js出错而导致的白屏问题）

### 如何避免生命周期中的坑
  - 已经移除的生命周期状态需要做逻辑的

TODO：