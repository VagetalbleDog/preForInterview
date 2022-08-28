# Ref对象创建

**什么是 ref 对象**，所谓 ref 对象就是用 `createRef` 或者 `useRef` 创建出来的对象，一个标准的 ref 对象应该是如下的样子

```js
{
    current:null , // current指向ref对象获取到的实际内容，可以是dom元素，组件实例，或者其它。
}
```

## 类组件中的ref

```js
class Index extends React.Component{
    constructor(props){
       super(props)
       this.currentDom = React.createRef(null)
    }
    componentDidMount(){
        console.log(this.currentDom)
    }
    render= () => <div ref={ this.currentDom } >ref对象模式获取元素或组件</div>
}
```

React.createRef 的底层逻辑很简单。

```js
export function createRef() {
  const refObject = {
    current: null,
  }
  return refObject;
}
```

对象上的 current 属性，用于保存通过 ref 获取的 DOM 元素，组件实例等。

## 函数式组件的ref

```js
export default function Index(){
    const currentDom = React.useRef(null)
    React.useEffect(()=>{
        console.log( currentDom.current ) // div
    },[])
    return  <div ref={ currentDom } >ref对象模式获取元素或组件</div>
}
```

useRef 底层逻辑是和 createRef 差不多，就是 **ref 保存位置不相同**，类组件有一个实例 instance 能够维护像 ref 这种信息，但是由于**函数组件每次更新都是一次新的开始，所有变量重新声明，所以 useRef 不能像 createRef 把 ref 对象直接暴露出去**，如果这样每一次函数组件执行就会重新声明 Ref，此时 ref 就会随着函数组件执行被重置，这就解**释了在函数组件中为什么不能用 createRef 的原因。**

**hooks 和函数组件对应的 fiber 对象建立起关联，将 useRef 产生的 ref 对象挂到函数组件对应的 fiber 上，函数组件每次执行，只要组件不被销毁，函数组件对应的 fiber 对象一直存在，所以 ref 等信息就会被保存下来。**

# React对Ref属性的处理-标记ref

首先明确一个问题是 **DOM 元素**和**组件实例** 必须用 ref 对象获取吗？答案是否定的，React 类组件提供了多种方法获取 **DOM 元素**和**组件实例**，说白了就是 React 对标签里面 ref 属性的处理逻辑多样化。

类组件获取ref的三种方法

```js
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

```js
class Children extends React.Component{  
    render=()=><div>hello,world</div>
}
/* TODO: Ref属性是一个函数 */
export default class Index extends React.Component{
    currentDom = null
    currentComponentInstance = null
    componentDidMount(){
        console.log(this.currentDom)
        console.log(this.currentComponentInstance)
    }
    render=()=> <div>
        <div ref={(node)=> this.currentDom = node }  >Ref模式获取元素或组件</div>
        <Children ref={(node) => this.currentComponentInstance = node  }  />
    </div>
}
```

```js
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

# ref的高阶用法

## forwardRef 转发 Ref

forwardRef 的初衷就是解决 ref 不能跨层级捕获和传递的问题。 forwardRef 接受了父级元素标记的 ref 信息，并把它转发下去，使得子组件可以通过 props 来接受到上一层级或者是更上层级的ref

#### 跨层级获取

想要通过标记子组件 ref ，来获取孙组件的某一 DOM 元素，或者是组件实例。

想要在 GrandFather 组件通过标记 ref ，来获取孙组件 Son 的组件实例。

```js
// 孙组件
function Son (props){
    const { grandRef } = props
    return <div>
        <div> i am alien </div>
        <span ref={grandRef} >这个是想要获取元素</span>
    </div>
}
// 父组件
class Father extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return <div>
            <Son grandRef={this.props.grandRef}  />
        </div>
    }
}
const NewFather = React.forwardRef((props,ref)=> <Father grandRef={ref}  {...props} />)
// 爷组件
class GrandFather extends React.Component{
    constructor(props){
        super(props)
    }
    node = null 
    componentDidMount(){
        console.log(this.node) // span #text 这个是想要获取元素
    }
    render(){
        return <div>
            <NewFather ref={(node)=> this.node = node } />
        </div>
    }
}
```

**forwardRef** 把 ref 变成了可以通过 props 传递和转发。

# ref原理

React是如何处理Ref标签引用的呢？

```js
export default class Index extends React.Component{
    state={ num:0 }
    node = null
    render(){
        return <div >
            <div ref={(node)=>{
               this.node = node
               console.log('此时的参数是什么：', this.node )
            }}  >ref元素节点</div>
            <button onClick={()=> this.setState({ num: this.state.num + 1  }) } >点击</button>
        </div>
    }
}
```

用回调函数方式处理 Ref ，**如果点击一次按钮，会打印几次 console.log ？** 来打印一下试试？

第一次打印为 null ，第二次才是 div ，为什么会这样呢？ 这样的意义又是什么呢？

命周期，提到了一次更新的两个阶段- render 阶段和 commit 阶段，对于整个 Ref 的处理，都是在 commit 阶段发生的，commit 阶段会进行真正的 Dom 操作，此时 ref 就是用来获取真实的 DOM 以及组件实例的，所以需要 commit 阶段处理。