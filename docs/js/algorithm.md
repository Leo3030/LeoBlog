---
  title: 算法
  date: 2024-2-20
  tags: ['js', '面试', "算法"]
  sidebar: auto
---

## 动态规划
动态规划（Dynamic Programming）是一种解决复杂问题的算法设计技术。在动态规划中，问题被分解为更小的子问题，然后通过解决这些子问题来解决原始问题。这种方法通常用于优化问题，其中需要找到最优解决方案。

动态规划通常适用于满足以下两个条件的问题：
1. **重叠子问题**：问题可以被分解为更小的子问题，这些子问题在解决过程中会多次重复出现。
2. **最优子结构**：问题的最优解可以通过其子问题的最优解来构造。

通过存储子问题的解决方案，动态规划可以避免重复计算，提高效率。这种方法常用于解决诸如最长公共子序列、背包问题、最短路径等各种计算问题。

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

## 贪心算法
TODO：

## 二分查找
TODO：

## BFS & DFS
TODO：
## 双指针
TODO：
## 滑动窗口
TODO：
## 位运算
TODO：
## 递归&分治
TODO：
## 剪枝&回溯
TODO：
## 堆
TODO：

## 单调栈
TODO：
## 排序算法
TODO：
## 链表
TODO：
## set & map
TODO：
## 栈
TODO：
## 队列
TODO：
## 数组
TODO：
## 字符串
TODO：
## 树
TODO：
## 字典树
TODO：
## 并查集
TODO：
## 其他类型
TODO：


