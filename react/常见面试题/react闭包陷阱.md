# React闭包陷阱
简单来说react闭包陷阱就是在useEffect、useMemo、useCallback中，引用了某个state值，导致state发生变化时，由于依赖项中没有传入相应的state，导致之前的函数没有更新，引用的还是之前的state。
# Example
以下这段代码会一直打印 1
```
import React, { useEffect, useState, useRef, useMemo } from 'react'
const Test = () => {
  const [a, setA] = useState(1)
  const [b, setB] = useState({ num: 1 })
  useEffect(() => {
    const timer = setInterval(() => {
      console.log(a)
    }, 500)
  }, [a])
  return (
    <>
      <button
        onClick={() => {
          setA(a + 1)
        }}
      >
        +a
      </button>
      <span>{a}</span>
    </>
  )
}
export default Test
```
# 为什么会发生闭包陷阱？

这个还是由react源码决定的。
hooks的原理就是在 fiber 节点的 memorizedState 属性存放一个链表，链表节点和 hook 一一对应，每个 hook 都在各自对应的节点上存取数据。

如果不传入依赖项，比如说useEffect 是不会重新执行的。

# 如何解决
首先就是要注意传入依赖项，第二个对于清理定时器，要在useEffect都返回值中做处理
```
import React, { useEffect, useState, useRef, useMemo } from 'react'
const Test = () => {
  const [a, setA] = useState(1)
  const [b, setB] = useState({ num: 1 })
  useEffect(() => {
    const timer = setInterval(() => {
      console.log(a)
    }, 500)
    return () => clearTimeout(timer)
  }, [a])
  return (
    <>
      <button
        onClick={() => {
          setA(a + 1)
        }}
      >
        +a
      </button>
      <span>{a}</span>
    </>
  )
}
export default Test
```