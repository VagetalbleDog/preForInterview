本章节不涉及通过memo、useMemo、useCallback等 对组件渲染进行控制，而是主要讲懒加载、异步加载等渲染方式。

# 懒加载和异步渲染

## 异步渲染 —— Suspense

Suspense是react提出的一种使用同步的代码的方式实现异步操作的方案，suspense可以让组件等待异步操作，在异步请求结束后再进行组件的渲染（目前这个用法还在试验阶段）。

一个示例如下,用Suspense包裹异步加载组件，当userinfo还未数据加载完成，展示Suspense中的fallback中的内容

```jsx
// 子组件
function UserInfo(params) {
  //获取用户数据信息，然后再渲染组件
  const user = getUserInfo();
  return <h1>{user.name}</h1>
}
//父组件
export default function Index(){
  return <Suspense fallback={<h1>loading<h1>}>
    <UserInfo />
  </Suspense>
}
```
如上所示，异步渲染的 UserInfo 组件可以直接通过 getUserInfo 请求数据，直接用数据 user 进行渲染，很显然现在是做不到的。现在的异步请求方式比较繁琐，主要是是通过类组件 componentDidMount 或者函数组件 useEffect 进行数据交互，获得数据后通过调用 setState 或 useState 改变 state 触发视图的更新。

传统模式：挂载组件-> 请求数据 -> 再渲染组件。
异步模式：请求数据-> 渲染组件。

那么异步渲染相比传统数据交互相比好处就是：

不再需要 componentDidMount 或 useEffect 配合做数据交互，也不会因为数据交互后，改变 state 而产生的二次更新作用。
代码逻辑更简单，清晰。

### suspense原理

Suspense在内部通过执行`try\catch`，在第一次渲染中捕获到没有数据的错误，然后渲染fallback，捕获到的错误通常是一个数据请求的promise，之后会执行promise.then，suspense会再执行一次渲染，把请求好的数据渲染上去。


## 动态加载(懒加载)

现在的Suspense配合react.lazy可以实现动态加载功能

### React.lazy
接受一个函数，该函数需要调用import函数，并返回一个Promise，这个Promise会resolve一个export default的React组件

```jsx
const LazyComponent = React.lazy(()=>import('./login'))
```

### React.lazy原理
内部模拟了一个promiseA 规范的场景，完全可以理解为React.lazy用一个promise请求一个组件。

### 使用React.lazy 配合 suspense做动态加载
在第一次渲染时，suspense捕获到react.lazy返回的promise，先把自身的fallback给渲染上去，之后待promise执行完毕之后，再把这个promise resolve出来的组件渲染上去，实现动态加载＋异步渲染。

```jsx
const LazyComponent = React.lazy(()=>import('./targetC'))

export default function Index(){
  return <>
    <Suspense fallback={<div>loading ....</div>}>
        <LazyComponent />
    </Suspense>
  </>
}
```

# 渲染错误边界和兜底
React组件渲染的过程如果有一个环节出现问题，就会导致整个组件渲染失败，那么整个组件的UI层就会渲染不出来，越靠近App根组件，组件渲染出现错误的危害性就越大。

## componentDidCatch
react为了防止异常的渲染情况，增加的生命周期。
可以捕获异常，接受两个参数(error,info)。

  - 我们可以在此生命周期中再进行一次setState，来展示错误兜底信息。
  - 也可以在此生命周期进行错误信息上报等操作。

## static getDerivedStateFromError

React更期望用 getDerivedStateFromError 代替 componentDidCatch 用于处理渲染异常的情况。getDerivedStateFromError 是静态方法，内部不能调用 setState。getDerivedStateFromError 返回的值可以合并到 state，作为渲染使用。用 getDerivedStateFromError 解决如上的情况。
```jsx
 class Index extends React.Component{
   state={
       hasError:false
   }  
   static getDerivedStateFromError(){
       return { hasError:true }
   }
   render(){  
      /* 如上 */
   }
}
```
如上完美解决了 ErrorTest 错误的问题。注意事项： 如果存在 getDerivedStateFromError 生命周期钩子，那么将不需要 componentDidCatch 生命周期再降级 ui。

# 实现一个异步组件加载功能

**实现效果**

  - 异步请求数据，请求完数据再挂载组件，没有加载完数据显示loading效果
  - 可量化复用

**思路**

  - 使用React.lazy 先请求数据，数据回来之后再加载组件，数据以props的形式传递给目标组件。

```jsx
import React, { Suspense } from 'react'
/**
 *
 * @param {*} Component  需要异步数据的component
 * @param {*} api        请求数据接口,返回Promise，可以再then中获取与后端交互的数据
 * @returns
 */
function AysncComponent(Component, api) {
  const AysncComponentPromise = () =>
    new Promise(async (resolve) => {
      const data = await api()
      resolve({
        default: (props) => <Component rdata={data} {...props} />
      })
    })
  return React.lazy(AysncComponentPromise)
}
/* 数据模拟 */
const getData = () => {
  return new Promise((resolve) => {
    //模拟异步
    setTimeout(() => {
      resolve({
        name: 'zwf',
        say: '朱文甫是个帅哥'
      })
    }, 1000)
  })
}
/* 测试异步组件 */
function Test({ rdata, age }) {
  const { name, say } = rdata
  console.log('组件渲染')
  return (
    <div>
      <div> hello , my name is {name} </div>
      <div>age : {age} </div>
      <div> i want to say {say} </div>
    </div>
  )
}
/* 父组件 */
export default class Index extends React.Component {
  LazyTest = AysncComponent(
    Test,
    getData
  ) /* 需要每一次在组件内部声明，保证每次父组件挂载，都会重新请求数据 ，防止内存泄漏。 */
  render() {
    const { LazyTest } = this
    return (
      <div>
        <Suspense fallback={<div>loading...</div>}>
          <LazyTest age={18} />
        </Suspense>
      </div>
    )
  }
}

```