项目中大量数据通常存在两种情况
  - 第一种是数据可视化，比如热力图，地图，大量数据点位等情况。
  - 第二种就是长列表渲染

## 时间分片
主要解决初次加载，一次性渲染大量数据造成的卡顿现象。浏览器js执行速度要比渲染dom速度快得多。

**时间分片，本质上不是减少浏览器的工作量，而是把一次性任务分割开来，给用户一种流畅的体验效果** 类似react fiber的作用

一个案例 
### 不优化

四万条数据 大概需要 10-20 s的加载时间

```jsx
import React, { Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react'
import './index.css'
/* 获取随机颜色 */
function getColor() {
  const r = Math.floor(Math.random() * 255)
  const g = Math.floor(Math.random() * 255)
  const b = Math.floor(Math.random() * 255)
  return 'rgba(' + r + ',' + g + ',' + b + ',0.8)'
}
/* 获取随机位置 */
function getPosition(position) {
  const { width, height } = position
  return {
    left: Math.ceil(Math.random() * width) + 'px',
    top: Math.ceil(Math.random() * height) + 'px'
  }
}
/* 色块组件 */
function Circle({ position }) {
  const style = React.useMemo(() => {
    //用useMemo缓存，计算出来的随机位置和色值。
    return {
      background: getColor(),
      ...getPosition(position)
    }
  }, [])
  return <div style={style} className="circle" />
}
export default function Index() {
  const [data, setData] = useState([])
  const [position, setPosition] = useState({
    width: 0,
    height: 0
  })
  useEffect(() => {
    const { offsetWidth, offsetHeight } = ref.current
    setPosition({
      width: offsetWidth,
      height: offsetHeight
    })
  }, [])
  const ref = useRef(null)
  return (
    <>
      <button
        onClick={() => {
          setData([...new Array(40000).fill(1)])
        }}
      >
        点击
      </button>
      <div ref={ref} className="box">
        {data.map((i, index) => (
          <Circle position={position} key={index} />
        ))}
      </div>
    </>
  )
}
```

![](https://s1.328888.xyz/2022/09/04/190yo.gif)

### 使用时间片分片优化

利用requestIdleCallback进行时间片分片，每次加载500条，可以看到渐进的渲染出数据

```jsx
import React, { Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react'
import './index.css'
/* 获取随机颜色 */
function getColor() {
  const r = Math.floor(Math.random() * 255)
  const g = Math.floor(Math.random() * 255)
  const b = Math.floor(Math.random() * 255)
  return 'rgba(' + r + ',' + g + ',' + b + ',0.8)'
}
/* 获取随机位置 */
function getPosition(position) {
  const { width, height } = position
  return {
    left: Math.ceil(Math.random() * width) + 'px',
    top: Math.ceil(Math.random() * height) + 'px'
  }
}
/* 色块组件 */
function Circle({ position }) {
  const style = React.useMemo(() => {
    //用useMemo缓存，计算出来的随机位置和色值。
    return {
      background: getColor(),
      ...getPosition(position)
    }
  }, [])
  return <div style={style} className="circle" />
}
export default function Index() {
  const [data, setData] = useState([])
  const [position, setPosition] = useState({
    width: 0,
    height: 0
  })
  //每次渲染数量
  const [renderNum, setRenderNum] = useState(500)
  //每次渲染的数据
  const [renderList, setRenderList] = useState([])
  const renderNewList = (index) => {
    const list = data.slice((index - 1) * renderNum, index * renderNum)
    return (
      <React.Fragment key={index}>
        {' '}
        {/*通过index缓存已经渲染的节点 */}
        {list.map((item, i) => (
          <Circle key={i + (index - 1) * renderNum} position={position}></Circle>
        ))}
      </React.Fragment>
    )
  }
  const toRenderList = (index, times) => {
    if (index > times) {
      return
    } //渲染完成即退出
    console.log('渲染第' + index + '次')
    renderList.push(renderNewList(index))
    setRenderList([...renderList])
    requestIdleCallback(() => {
      toRenderList(++index, times)
    })
  }
  useEffect(() => {
    const { offsetWidth, offsetHeight } = ref.current
    setPosition({
      width: offsetWidth,
      height: offsetHeight
    })
  }, [])
  const ref = useRef(null)
  return (
    <>
      <button
        onClick={() => {
          setData([...new Array(40000).fill(1)])
          const times = Math.ceil(data.length / renderNum)
          let index = 1
          toRenderList(index, times)
        }}
      >
        点击
      </button>
      <div ref={ref} className="box">
        {renderList}
      </div>
    </>
  )
}

```

![](https://s1.328888.xyz/2022/09/04/194vF.gif)

这样看起来效果就好多了。

（这个是 gif 形式，会出现丢帧的情况，在真实场景，体验感更好）

## 虚拟滚动和虚拟列表
滑动加载是M端和C端一种常见的数据请求方式，有一个比较大的问题 就是如果没经过处理，加载完成的数据展示的元素都显示在页面上，随着数据量越来越大，会使页面中的DOM元素越来越多，即便是像React可以良好运用diff来复用老节点，也不能保证大量的diff带来的性能开销。

综上，需要解决大量DOM存在，带来的性能问题。

### 虚拟列表

在长列表滚动过程中，只有视图区域显示的是真实DOM，滚动过程中，不断截取视图的有效区域，让人感觉是列表在滚动，达到无限滚动的效果。

虚拟列表分为三个区域 

  - 视图区

    能够直观看到的列表区，此时的元素都是真实的DOM元素。

  - 缓冲区

    防止用户上滑和下滑的过程中，出现白屏效果，相当于也是提前获取数据渲染为真实DOM

  - 虚拟区

    不需要渲染真实的DOM元素，通过虚拟区来减少页面上DOM元素的数量。

### 具体实现思路


  - 通过useRef获取元素，维护一个end和start 标记需要渲染或者展示的元素的下标。

  - useEffect初始化计算容器的高度，截取初始化列表长度，使用div占位，撑起滚动条，内容区采用绝对定位，浮于容器之上。

  - 监听onScroll事件，根据scrollTop来计算渲染区域向上偏移量,根据偏移量来计算当前应该渲染哪些数据，更新end和start。可以利用css translate属性，来实现滚动的效果

  - 通过计算end和start来重新渲染列表

```jsx
import { useEffect, useRef, useState } from 'react'
import './index.css'
const VirtualList = () => {
  const [dataList, setDataList] = useState([]) // 数据源
  const [position, setPosition] = useState([0, 0]) // 缓冲区和视图区的索引
  const scroll = useRef(null) //滚动元素
  const box = useRef(null) // 获取容器高度
  const context = useRef(null) // 用于移动视图区域，形成滑动效果
  const scrollInfo = useRef({
    // 这里使用useRef来缓存一些数据
    height: 500, //容器高度
    bufferCount: 8, //缓冲区个数
    itemHeight: 60, // 每个item高度
    renderCount: 0 //渲染区个数
  })
  useEffect(() => {
    const height = box.current.offsetHeight
    const { itemHeight, bufferCount } = scrollInfo.current
    const renderCount = Math.ceil(height / itemHeight) + bufferCount //渲染数量 = 视图展示的数量 + 缓冲区数量
    scrollInfo.current = {
      renderCount,
      height,
      bufferCount,
      itemHeight
    }
    const dataList = new Array(10000).fill(1).map((item, index) => index + 1)
    setDataList(dataList)
    setPosition([0, renderCount])
  }, [])
  const handleScroll = () => {
    const { scrollTop } = scroll.current
    const { itemHeight, renderCount } = scrollInfo.current
    const currentOffset = scrollTop - (scrollTop % itemHeight)
    console.log(currentOffset)
    const start = Math.floor(scrollTop / itemHeight)
    context.current.style.transform = `translate3d(0,${currentOffset}px,0)` // 使用css translate属性 造成下滑效果
    const end = Math.floor(scrollTop / itemHeight + renderCount + 1)
    if (end !== position[1] || start !== position[0]) {
      /* 如果render内容发生改变，那么截取  */
      setPosition([start, end])
    }
  }
  const { itemHeight, height } = scrollInfo.current
  const [start, end] = position
  const renderList = dataList.slice(start, end) /* 渲染区间 */
  console.log('渲染区间', position)
  return (
    <div className="list_box" ref={box}>
      <div
        className="scroll_box"
        style={{ height: height + 'px' }}
        onScroll={handleScroll}
        ref={scroll}
      >
        <div className="scroll_hold" style={{ height: `${dataList.length * itemHeight}px` }} />
        <div className="context" ref={context}>
          {renderList.map((item, index) => (
            <div className="list" key={index}>
              {' '}
              {item + ''} Item{' '}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default VirtualList

```
index.css
```css
.scroll_box {
  overflow: scroll;
  position: relative;
}
.scroll_hold {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
}

```
以下是实现效果

![](https://s1.328888.xyz/2022/09/04/15StP.gif)