# 初级回答
key在diff的时候能起到标记的作用，这样react就能清楚的知道你新增了一个元素，只用新增一个元素，后面两个只要移动就可以了（直接复用），极大优化性能。
# Tips
  - react对于**非list结构的新旧节点对比确实是逐层对比**，但对于list结构且加了key就不是逐层对比了。
  - diff对比是先对比key，若key不同会直接冲洗创建节点，key相同再对比type，如果type不同也重新创建。因此只有key和type都相同时，react才会基于旧节点和新的props生成新节点。


# 抛出问题
## 为什么list渲染时不提供key，react就会警告，而普通的dom元素不会？
  - list的节点始终是动态生成的，从宏观上来看，就是进行遍历生成节点，从react的角度，他需要考虑list数据规模大小是否会造成性能问题。所以diff会在key和type都相同时，利用旧的fiber节点clone一个新的fiber节点，而不是重新创建。
  - **在某些情况下**，对于list结构，react会用map将key作为索引值来缓存旧的fiber节点。只有当在对比时，发现key不相同，才会走这种缓存逻辑。
  - 对于非list结构很难出现dom经常变动的情况，逐层对比就已经可以满足新旧节点的对比，对于list来说，当在头部和中部插入数据时，逐层对比会因为对比错位而失效，所以需要key来缓存节点。
## list插入头部，diff的过程

diff时发现list，进入对比key的过程。先逐层对比，发现新的key与之前的key不一致，察觉到可能节点有变动，于是声明一个map缓存旧节点，之后走缓存逻辑，发现key在map中有对应的旧fiber节点，就使用clone复用旧的fiber节点，发现不存在，则是新插入的节点，走fiber创建的逻辑。

## 为什么不推荐用index做key
不管是不提供key还是提供index作为key，都会导致新旧节点的key全部不一致，强行导致已经错位的节点进行逐层对比，本应该新建的节点因为key错位走了更新流程，本应该更新的节点因为key错位走了新建流程。

来看一个demo
错误示例
```jsx
import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react'
const Test = () => {
  const [list, setList] = useState([
    {
      name: 'zwf',
      id: 1
    },
    {
      name: 'abc',
      id: 2
    }
  ])
  const addItem = () => {
    const id = Number(new Date())
    setList([{ name: 'abccc' + id, id: id }, ...list])
  }
  return (
    <>
      {list.map((i,index) => (
        <li key={index}>
          {i.name}
          <input />
        </li>
      ))}
      <button onClick={addItem}>++++</button>
    </>
  )
}
export default Test
```

应该是插入节点，应该是创建的，结果走了更新流程。