---
  title: 算法
  date: 2024-2-20
  tags: ['js', '面试', "算法"]
  sidebar: auto
---

## N 叉树最深层级

```js
//N叉树最深层级
function getDeepLevel(data) {
  if (!data) {
    return 0;
  } else {
    return 1 + Math.max(...data.children.map((item) => getDeepLevel(item)));
  }
}
```
