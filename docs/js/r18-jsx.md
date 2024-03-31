---
title: 探索React18——JSX
---

### JSX 是什么

JSX 是 JavaScript 的语法扩展，主要用于 React 框架中构建用户界面。JSX 允许开发者在 JavaScript 代码中编写类似 XML 的标记，这些标记会被转译成纯 JavaScript 代码。通过 JSX，开发者可以更直观地描述 UI 组件的结构和外观，提高了代码的可读性和可维护性。

### React 必须使用 JSX 么？

其实 React 和 JSX 没有必然的绑定关系，即使没有 JSX 我们也能通过 React 提供的方法写出 DOM 结构来

```
<ul>
  <li>1</li>
</ul>

<ul>
  <li>1</li>
  <li>2</li>
</ul>
```

```
React.createElement("ul", null,
  React.createElement("li", null, "1")
);

React.createElement("ul", null,
  React.createElement("li", null, "1"),
  React.createElement("li", null, "2")
);
```

这两段代码在运行时是一样的，但通过对比可以发现，JSX 写的代码看上去更加的简单易懂。
所以 React 官方也推荐使用 JSX。

### JSX 转换

其实上面的两段代码也就是 JSX 转换，即将 JSX 转换成对应的 js 代码。
JSX 的转换分两种情况，一个是运行时，一个是编译时

- 编译时：就是通过 babel 插件将 JSX 转换成对应的 js 代码。
- 运行时：则是通过`jsx`方法或`React.createElement`方法来实现。

### React 项目结构

开始写具体代码之前，我们先来看一下 react 的项目结构，react（基础版）项目结构：

- react（宿主环境无关的公用方法）
- react-reconciler（协调器的实现，宿主环境无关）
  各种宿主环境的包
- shared（公用辅助方法，宿主环境无关）

这里的 react 写的是和宿主环境无关的功用方法，即和当前运行环境无关，是 react 的核心逻辑，react 通过搭配不同的库例如：`react-dom`, `react-native`,等，来实现在不同的设备上运行同一套代码的逻辑。

### 什么是 ReactElement？

**ReactElement**：ReactElement 是 React 中描述 UI 组件结构的对象，它是通过 JSX 转译而来，包含了组件的类型、属性等信息。ReactElement 最终会被 React 渲染成真实的 DOM 元素。

ReactElement 的数据结构如下

```// ReactElement
const ReactElement = function (
	type: Type,
	key: Key,
	ref: Ref,
	props: Props
): ReactElementType {
	const element = {
		$$typeof: REACT_ELEMENT_TYPE,
		type,
		key,
		ref,
		props
	};

	return element;
};
```

ReactElement 和之后的 FiberNode 不同，ReactElement 只会用来描述 UI 组件，FiberNode 可以做更多的事，**FiberNode 是基于 ReactElement 生成出来的**，记住这两者之间的关系，后续我们在详细说明 FiberNode。

### 手写 JSX 方法

在 babel 官网上我们可以看到
![](https://files.mdnice.com/user/58172/4473396c-170c-4e2c-881b-18074cf47f1e.png)
这里 jsx 方法需要如下参数

```
export const jsx = (type: ElementType, config: any, ...maybeChildren: any) => {
```

jsx 方法本质上就是生成一个 ReactElement
所以返回值是 ReactElement，完整的 jsx 方法如下

```
export const jsx = (type: ElementType, config: any, ...maybeChildren: any) => {
	let key: Key = null;
	const props: Props = {};
	let ref: Ref = null;

	for (const prop in config) {
		const val = config[prop];
		if (prop === 'key') {
			if (val !== undefined) {
				key = '' + val;
			}
			continue;
		}
		if (prop === 'ref') {
			if (val !== undefined) {
				ref = val;
			}
			continue;
		}
		if ({}.hasOwnProperty.call(config, prop)) {
			props[prop] = val;
		}
	}
	const maybeChildrenLength = maybeChildren.length;
	if (maybeChildrenLength) {
		if (maybeChildrenLength === 1) {
			props.children = maybeChildren[0];
		} else {
			props.children = maybeChildren;
		}
	}
	return ReactElement(type, key, ref, props);
};
```

其中绝大数的逻辑都是对`config`和`children`的处理。

到这里我们就实现了一个简单的`jsx`方法。
