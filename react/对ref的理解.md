# Ref的基本概念

## 两种方法创建Ref对象

  - 类组件使用`React.createRef() `,实际上就是创建了一个Ref对象绑定到类式组件实例上。
      ```
      注意，不要函数组件中使用createRef，可能会造成Ref对象丢失。因为函数组件并没有组件实例，每次组件刷新，重新执行上下文，Ref对象就会丢失。
      ```
  - 函数组件使用useRef来创建Ref，会把产生的Ref对象挂载到函数组件对应的fiber上，函数每次执行，只要组件不被销毁，fiber对象就会一直存在，所以Ref对象不会丢失。
  
## 类组件获取Ref的三种方式

### 1、Ref属性是一个字符串

```
/* 类组件 */
class Children extends Component{  
    render=()=><div>hello,world</div>
}
/* TODO:  Ref属性是一个字符串 */
export default class Index extends React.Component{
    componentDidMount(){
       console.log(this.refs)
    }
    render=()=> <div>
        <div ref="currentDom"  >字符串模式获取元素或组件</div>
        <Children ref="currentComInstance"  />
    </div>
}
```

打印

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3ca7efcd73fe429aa83bd91f068c5508~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

  - 既可以绑定dom元素，也可以绑定子组件
  - 如果是dom元素，会把dom元素绑定到this.refs上，如果是类组件，会把子组件的实例绑定到this.refs上

### 2、Ref属性是一个函数

```
import React, { createContext, useContext, useEffect, useState } from 'react'

class Children extends React.Component {
  render = () => <div>hello,world</div>
}
/* TODO: Ref属性是一个函数 */
export default class Index extends React.Component {
  a = null
  b = null
  componentDidMount() {
    console.log(this.a)
    console.log(this.b)
  }
  render = () => (
    <div>
      <div ref={(node) => (this.a = node)}>Ref模式获取元素或组件</div>
      <Children ref={(node) => (this.b = node)} />
    </div>
  )
}
```
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/74ba71b6c4f5456eaf7cd46e51598fa4~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

如上代码片段，当用一个函数来标记 Ref 的时候，将作为 callback 形式，等到真实 DOM 创建阶段，执行 callback ，获取的 DOM 元素或组件实例，将以回调函数第一个参数形式传入，所以可以像上述代码片段中，用组件实例下的属性 a和 b 来接收真实 DOM 和组件实例。

### 3、Ref属性是一个对象

ref属性是createRef创造出来的对象
```
class Children extends React.Component{  
    render=()=><div>hello,world</div>
}
export default class Index extends React.Component{
    currentDom = React.createRef(null)
    currentComponentInstance = React.createRef(null)
    componentDidMount(){
        console.log(this.currentDom)
        console.log(this.currentComponentInstance)
    }
    render=()=> <div>
         <div ref={ this.currentDom }  >Ref对象模式获取元素或组件</div>
        <Children ref={ this.currentComponentInstance }  />
   </div>
}
```
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/796e66d30ee84a62867fe264c5b5eca6~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

直接用即可

## Ref高阶用法

### 1、forwardRef转发Ref
用于ref的跨层级获取

### 2、ref实现组件通信
  - 对于类组件来说，直接获取子组件实例，实现组件通信即可。
  - 对于函数组件可以用forwardRef + useImperativeHandle

### 3、函数组件缓存数据

  在函数组件中，由于ref是绑定到fiber实例上的，所以除了函数组件销毁时，ref都不会更改，而有些情况下我们不想一些数据的改变会重新渲染组件，就可以将这些数据存到ref中，数据的改变不会引起函数组件渲染
  