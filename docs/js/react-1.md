---
title: React#1_JSX转换
tags: ["React"]
---

## JSX 转换是什么

指的是代码编译时或者运行时，将 jsx 方法编译成浏览器可读的 js 方法，这里分成两个部分：

- 编译时
- 运行时

### 编译时，由 babel 编译实现

方法 1: 利用已有的包来实现

```js
npm install @babel/core @babel/preset-env @babel/preset-react --save-dev
```

在配合 babel.config.js

```js
module.exports = {
  presets: ["@babel/preset-env", "@babel/preset-react"],
};
```

方法 2:手写一个 babel 转换 jsx 插件

```js
// transformJSXPlugin.js
const { types: t } = require("@babel/core");

module.exports = function ({ types: t }) {
  return {
    visitor: {
      JSXElement(path) {
        const openingElement = path.node.openingElement;
        const tagName = openingElement.name.name;
        const attributes = openingElement.attributes.map((attr) => {
          if (attr.type === "JSXAttribute") {
            return t.objectProperty(
              t.stringLiteral(attr.name.name),
              attr.value
            );
          }
          return attr;
        });

        const children = path.node.children.map((child) => {
          if (t.isJSXText(child)) {
            return t.stringLiteral(child.value);
          }
          return child;
        });

        const element = t.callExpression(t.identifier("createElement"), [
          t.stringLiteral(tagName),
          t.objectExpression(attributes),
          ...children,
        ]);

        path.replaceWith(element);
      },
    },
  };
};
```

在 babel.config.js 中引入

```js
module.exports = {
  plugins: [["./transformJSXPlugin.js"]],
};
```

### 运行时
