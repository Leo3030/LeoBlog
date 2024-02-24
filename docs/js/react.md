---
  title: React介绍
  date: 2024-02-20
  tags: ['面试', 'react', 'js']
---

## 历史背景及特性

### 问题根源

- 传统 UI 操作（DOM API）关注太多细节
- 应用程序状态分散在各处，难以追踪和维护

### React 思想

- UI 细节：始终整体“刷新”页面，无需关心细节
- 数据模型：

  - Flux 架构：单向数据流
  - 实现：
    - Redux
    - Mobx

  ![Alt Text](/images/202205171431001.png)

## 什么是 React？

- React 是一个 js 的库，一个前端的 ui 框架，通过组件化 UI 来解决图层开发复用的问题，本质是一个组件化的框架
- React 的核心设计思路有三点
  - **申明式：** React 通过申明组件的方式，更好的方便了项目的阅读，比起 JQuery 那种命令式的开发方式，申明式无疑更加的直观和便于组合
  - **组件化：** React 通过组件化的方式，让视图的拆分和复用，更加的简单高效，做到了高内聚低耦合
  - **通用性：** React 基于虚拟 Dom 来进行操作 UI，所以可以在各种平台运行，比如说 ios/android，小程序等等
- React 的缺点：
  - 作为一个视图层的框架，React 并没有提供一套完整的大型应用的解决方案。比如说页面的 router，server 等，需要依赖别的解决方案，比如说 express..js 或者 next.js 等等

## React 为什么要用 JSX

### 官方定义

JSX 是 JS 的语法拓展，或者是一个类似于 XML 的 es 语法拓展

::: tip
React 官方并不强制使用 JSX，也可以使用 React.createElement 来实现同样的功能，但是使用 JSX 的写法会比直接使用 createElement 更加简单，易读，JSX 最后会通过 babel 转换成 createElement，所以 JSX 更像是 createElement 的语法糖
:::

### 其他方案

- 模版
- 模版字符串

## 生命周期

- 挂载
  - constructor （严格来说这个不算 React 的生命周期，这个是类的构造函数）
  - UNSAFE_componentWillMount (弃用)
  - componentDidMount (组件完成挂载是触发，适合写一些初始化异步调用后台数据的逻辑)
- 更新
  - componentWillReceiveProps （弃用）
  - componentWShouldUpdate （更新前出发，能够阻止更新，节省不必要额资源，是优化的方向之一）
- 卸载
  - componentWillMount （在组件卸载的时候触发，可以用于删除事件等操作）
- 异常
  - componentCatchError（用于处理因为 js 出错而导致的白屏问题）

## 如何避免生命周期中的坑

- 已经移除的生命周期状态需要做逻辑的
TODO：

## react hook
- `use`：是一个React Hook，可以读取Promise或者上下文资源的值
```js
// promise or context
const value = use(resource);
```


