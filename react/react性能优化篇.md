# 渲染控制
render阶段（类组件render，函数组件执行自身）的作用：
      
    根据一次更新中产生的新状态值，通过React.createElement替换成新的状态。然后产生一个新的props，如果子代有有元素是组件，会重复上述的过程，直到调和完成，完成render阶段，进入commit阶段

## 几种控制render的方法

### 从父组件隔断子组件的渲染（memo、useMemo）
     ```
        import React, { useEffect, useState, useRef } from 'react'

        const Son = React.memo(({ number }) => {
        useEffect(() => {
            console.log('子组件重新渲染 好累')
        })
        return (
            <>
            <div>我的值是{number}</div>
            </>
        )
        })
        const Test = () => {
        const [a, setA] = useState(1)
        const [b, setB] = useState(1)
        return (
            <>
            <button
                onClick={() => {
                setA(a + 1)
                }}
            >
                +a
            </button>
            <button
                onClick={() => {
                setB(b + 1)
                }}
            >
                +b
            </button>
            <Son number={a} />
            </>
        )
        }
        export default Test
     ```
     用memo包一下子组件等同于，推荐下面这种写法，反而更加灵活
     ```
     {useMemo(
        () => (
          <Son number={a} />
        ),
        [a]
      )}
     ```
     **useMemo的原理**

        useMemo 会记录上一次执行的返回值，并把它绑定在函数组件对应的fiber上，只要组件不销毁，缓存值就一直存在，如果有一项改变，就会重新执行函数，返回值作为新的值记录在fiber上。

### PureComponent
纯组件是一种发自组件本身的渲染优化策略，开发类组件选择继承纯组件时，每次状态改变会浅比较state和props是否相等。
```
class Children extends React.PureComponent
```

什么是浅比较？
    
    浅比较只会比较基础数据类型，而对于引用类型，如果指针没变，是不会更新的，可以使用浅拷贝。

### shouldComponentUpdate

这个不多说，在类组件中常用，自定义渲染逻辑

### 打破渲染限制
  - forceUpdate
  - context的使用

## 什么时候需要注意渲染节流

  - 数据可视化的模块组件，展示大量数据，一次更新需要大规模的diff
  - 大量表单的页面，react一般会采用受控组件的模式去管理表单数据层，表单数据层完全依赖于props或state，用户频繁操作表单就会造成重新渲染，需要处理。

        什么是受控组件？

        在HTML的表单元素中，它们通常自己维护一套state，并随着用户的输入自己进行UI上的更新，这种行为是不被我们程序所管控的。而如果将React里的state属性和表单元素的值建立依赖关系，再通过onChange事件与setState()结合更新state属性，就能达到控制用户输入过程中表单发生的操作。被React以这种方式控制取值的表单输入元素就叫做受控组件。

  - 越靠近根组件越需要注意