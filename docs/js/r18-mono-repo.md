---
title: 探索React18——项目搭建：Multi-repo 还是 Mono-repo
---

### `Multi-repo`和`Mono-repo`该如何选择？

- `Multi-repo`每个库有自己独立的仓库，逻辑清晰，相对应的，协同管理会更繁琐。
- `Mono-repo`可以很方便的协同管理不同独立的库的生命周期，相对应的，会有更高的操作复杂度。

选择`Multi-repo`还是`Mono-repo`主要还是根据业务的需求而定，`Multi-repo`更适合用于业务相对单一，各个项目之间没有特别大的依赖性的项目中间。
`Mono-repo`则与之相反，更适合用于业务复杂，多个库之间有相互的依赖关系的项目，例如：_React_，_VUE_ 之类的项目。

![](https://files.mdnice.com/user/58172/ddcaafef-fc0e-4f7e-a2b4-14092c368775.png)

![](https://files.mdnice.com/user/58172/a49a2ac4-9aa4-4b4e-a355-adf02e60d764.png)

### Multi-repo 的痛点

- **代码的复用**
  在维护多个项目时候，有些代码可能会被重复用到，这种时候就会面临多种选择了，是直接复制代码，还是将逻辑抽离成一个专门的第三方 npm 包，这些各有各的问题。直接复制的话，当代码出现问题的时候，需要一个个项目里面去更改，而使用 npm 包管理的方式，则需要程序员在不同的项目里面管理 npm 包的版本，这两个方案更新完之后还需要每个项目单独发布，所以即费时又显得很不专业。

### Mono-repo 的落地

基于`Multi-repo`的的问题，`Mono-repo`应运而生，`Mono-repo`解决了`Multi-repo`代码复用的问题，**实现了工作流的一致性**，某个库代码在被改动的第一时间就可以被知道了，其次也**降低了项目的基建成本**，很多有关联的库不需要有多个 repo 只需要在一个 repo 中集成就行了，也大大减少了 CI 的工作量，最后`Mono-repo`也**增加了团队的协作效率**，避免了之前`Multi-repo`中第三方库更新了，所有用到的库都需要更新的问题

### React18 的目录结构

说了这么多关于`Mono-repo`和`Multi-repo`，主要是为了我们搭建自己的 react 做准备，首先让我们来看看官方的 React 是什么目录结构吧。

![](https://files.mdnice.com/user/58172/25865dac-7465-40be-911d-8abff7dceb3b.png)
这里可以看到 Facebook 的 react 是由多个库组成的`Mono-repo`，所以我们也采用类似的形式来搭建我们自己的 React 项目。

### Mono-repo 工具的选择

市面上有很多构建 Mono-repo 的方案，比如说`lerna`,这里我们使用`pnpm`来实现我们的`Mono-repo`，`pnpm`是一个类似于`yarn`、`npm`的包管理工具，其本身具有`workspace`属性，可以直接支持`Mono-repo`

参考资料：[现代前端工程为什么越来越离不开 Monorepo](https://juejin.cn/post/6944877410827370504)。
