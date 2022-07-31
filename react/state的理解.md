# 类组件中的state
```
setState(obj,callback)
```

  - 第一个参数obj，如果obj为一个对象，则为积极即将合并的state。如果obj是一个函数，那么state和props将作为参数，返回值作为即将合并的state
  - 第二个参数callback，作为当前setState的回调函数，在当前setState触发的渲染完成之后回调。

## 类组件如何限制state变更更新视图？

  - pureComponent 可以对state和props执行浅比较，如果没有变化组件不更新。
  - 在shouldComponentUpdate 中进行判断，需要更新返回true，不需要更新返回false


## state 到底是同步的还是异步的？


一般来说，react对于state是批量更新的

```
export default class index extends React.Component{
    state = { number:0 }
    handleClick= () => {
          this.setState({ number:this.state.number + 1 },()=>{   console.log( 'callback1', this.state.number)  })
          console.log(this.state.number)
          this.setState({ number:this.state.number + 1 },()=>{   console.log( 'callback2', this.state.number)  })
          console.log(this.state.number)
          this.setState({ number:this.state.number + 1 },()=>{   console.log( 'callback3', this.state.number)  })
          console.log(this.state.number)
    }
    render(){
        return <div>
            { this.state.number }
            <button onClick={ this.handleClick }  >number++</button>
        </div>
    }
} 
```
打印 0 0 0 callback1 1 ，callback2 1 ，callback3 1 ，

这是因为，如上代码，在react上下文执行栈中会变成这样

![img](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/478aef991b4146c898095b83fe3dc0e7~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

都处在一个事件执行上下文中，所以看起来是异步的

为什么异步操作里面的批量更新规则会被打破呢？比如用 promise 或者 setTimeout 在 handleClick 中这么写：

setTimeout(()=>{
    this.setState({ number:this.state.number + 1 },()=>{   console.log( 'callback1', this.state.number)  })
    console.log(this.state.number)
    this.setState({ number:this.state.number + 1 },()=>{    console.log( 'callback2', this.state.number)  })
    console.log(this.state.number)
    this.setState({ number:this.state.number + 1 },()=>{   console.log( 'callback3', this.state.number)  })
    console.log(this.state.number)
})
打印 ： callback1 1 , 1, callback2 2 , 2,callback3 3 , 3

那么在整个 React 上下文执行栈中就会变成如下图这样:

![img](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/48e730fc687c4ce087e5c0eab2832273~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

所以批量更新规则被打破。

那么，如何在如上异步环境下，继续开启批量更新模式呢？

React-Dom 中提供了批量更新方法 unstable_batchedUpdates，可以去手动批量更新，可以将上述 setTimeout 里面的内容做如下修改:

import ReactDOM from 'react-dom'
const { unstable_batchedUpdates } = ReactDOM

setTimeout(()=>{
    unstable_batchedUpdates(()=>{
        this.setState({ number:this.state.number + 1 })
        console.log(this.state.number)
        this.setState({ number:this.state.number + 1})
        console.log(this.state.number)
        this.setState({ number:this.state.number + 1 })
        console.log(this.state.number) 
    })
})
打印： 0 , 0 , 0 , callback1 1 , callback2 1 ,callback3 1


setState 的同步异步，但这个不是 setTimeout、Promise 那种异步，只是指 setState 之后是否 state 马上变了，是否马上 render。

我们梳理了下 React 的渲染流程，包括 render 阶段、commit 阶段，render 阶段是从 vdom 转 fiber，包含 schedule 和 reconcile，commit 阶段是把 fiber 更新到 dom。渲染流程的入口是 performSyncWorkOnRoot 函数。
setState 会创建 update 对象挂到 fiber 对象上，然后调度 performSyncWorkOnRoot 重新渲染。

在 react17 中，setState 是批量执行的，因为执行前会设置 executionContext。但如果在 setTimeout、事件监听器等函数里，就不会设置 executionContext 了，这时候 setState 会同步执行。可以在外面包一层 batchUpdates 函数，手动设置下 excutionContext 来切换成异步批量执行。

在 react18 里面，如果用 createRoot 的 api，就不会有这种问题了。
setState 是同步还是异步这个问题等 react18 普及以后就不会再有了，因为所有的 setState 都是异步批量执行了。


## 如何提升state的更新优先级

React-dom 提供了 flushSync ，flushSync 可以将回调函数中的更新任务，放在一个较高的优先级中。React 设定了很多不同优先级的更新任务。如果一次更新任务在 flushSync 回调函数内部，那么将获得一个较高优先级的更新。

接下来，将上述 handleClick 改版如下样子：
```
handerClick=()=>{
    setTimeout(()=>{
        this.setState({ number: 1  })
    })
    this.setState({ number: 2  })
    ReactDOM.flushSync(()=>{
        this.setState({ number: 3  })
    })
    this.setState({ number: 4  })
}
render(){
   console.log(this.state.number)
   return ...
}
```
打印 3 4 1 ，相信不难理解为什么这么打印了。

首先 flushSync this.setState({ number: 3 })设定了一个高优先级的更新，所以 2 和 3 被批量更新到 3 ，所以 3 先被打印。
更新为 4。
最后更新 setTimeout 中的 number = 1。
flushSync补充说明：flushSync 在同步条件下，会合并之前的 setState | useState，可以理解成，如果发现了 flushSync ，就会先执行更新，如果之前有未更新的 setState ｜ useState ，就会一起合并了，所以就解释了如上，2 和 3 被批量更新到 3 ，所以 3 先被打印。

综上所述， React 同一级别更新优先级关系是:

flushSync 中的 setState > 正常执行上下文中 setState > setTimeout ，Promise 中的 setState。

# 函数组件中的state

基本用法

```
 [ ①state , ②dispatch ] = useState(③initData)
 ```

① state，目的提供给 UI ，作为渲染视图的数据源。
② dispatch 改变 state 的函数，可以理解为推动函数组件渲染的渲染函数。
③ initData 有两种情况，第一种情况是非函数，将作为 state 初始化的值。 第二种情况是函数，函数的返回值作为 useState 初始化的值。
initData 为非函数的情况:
```
/* 此时将把 0 作为初使值 */
const [ number , setNumber ] = React.useState(0)
```
initData 为函数的情况:
```
 const [ number , setNumber ] = React.useState(()=>{
       /*  props 中 a = 1 state 为 0-1 随机数 ， a = 2 state 为 1 -10随机数 ， 否则，state 为 1 - 100 随机数   */
       if(props.a === 1) return Math.random() 
       if(props.a === 2) return Math.ceil(Math.random() * 10 )
       return Math.ceil(Math.random() * 100 ) 
    })
```
对于 dispatch的参数,也有两种情况：

第一种非函数情况，此时将作为新的值，赋予给 state，作为下一次渲染使用;

第二种是函数的情况，如果 dispatch 的参数为一个函数，这里可以称它为reducer，reducer 参数，是上一次返回最新的 state，返回值作为新的 state。

dispatch 参数是一个非函数值
```
const [ number , setNumbsr ] = React.useState(0)
/* 一个点击事件 */
const handleClick=()=>{
   setNumber(1)
   setNumber(2)
   setNumber(3)
}
```
dispatch 参数是一个函数
```
const [ number , setNumbsr ] = React.useState(0)
const handleClick=()=>{
   setNumber((state)=> state + 1)  // state - > 0 + 1 = 1
   setNumber(8)  // state - > 8
   setNumber((state)=> state + 1)  // state - > 8 + 1 = 9
}
```

## useState注意事项-浅比较

在使用 useState 的 dispatchAction 更新 state 的时候，记得不要传入相同的 state，这样会使视图不更新。比如下面这么写：

export default function Index(){
    const [ state  , dispatchState ] = useState({ name:'alien' })
    const  handleClick = ()=>{ // 点击按钮，视图没有更新。
        state.name = 'Alien'
        dispatchState(state) // 直接改变 `state`，在内存中指向的地址相同。
    }
    return <div>
         <span> { state.name }</span>
        <button onClick={ handleClick }  >changeName++</button>
    </div>
}
如上例子🌰中，当点击按钮后，发现视图没有改变，为什么会造成这个原因呢？

在 useState 的 dispatchAction 处理逻辑中，会浅比较两次 state ，发现 state 相同，不会开启更新调度任务； demo 中两次 state 指向了相同的内存空间，所以默认为 state 相等，就不会发生视图更新了。

解决问题： 把上述的 dispatchState 改成 dispatchState({...state}) 根本解决了问题，浅拷贝了对象，重新申请了一个内存空间。