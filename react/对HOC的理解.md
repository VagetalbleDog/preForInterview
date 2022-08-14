# HOC 是什么
参照高阶函数的定义，高阶组件就是接受一个组件作为参数，返回一个组件（强化后）
# HOC 解决了什么问题？

根本上：根本上就是解决了大量了代码复用、逻辑复用问题。

哪些逻辑复用？

  - 对渲染的控制，可以控制是否渲染组件，也可以像dva一样懒加载/动态组件
  - 可以对业务组件的一些事件加一些监听功能，或加一些自定义的类似生命周期的功能

# 两种不同的高阶组件

## 属性代理
用组件包裹一层代理组件，在代理组件上，可以做一些对原组件的强化操作
```
function HOC(WrapComponent){
    return class Advance extends React.Component{
       state={
           name:'alien'
       }
       render(){
           return <WrapComponent  { ...this.props } { ...this.state }  />
       }
    }
}
```

## 反向继承
使用类组件写法，包装后的组件继承了原始组件本身
```
class Index extends React.Component{
  render(){
    return <div> hello,world  </div>
  }
}
function HOC(Component){
    return class wrapComponent extends Component{ /* 直接继承需要包装的组件 */
        
    }
}
export default HOC(Index) 
```
# 如何编写高阶组件
## 1 强化props
强化 props 就是在原始组件的 props 基础上，加入一些其他的 props ，强化原始组件功能。举个例子，为了让组件也可以获取到路由对象，进行路由跳转等操作，所以 React Router 提供了类似 withRouter 的 HOC 。
```
function withRouter(Component) {
  const displayName = `withRouter(${Component.displayName || Component.name})`;
  const C = props => {
      /*  获取 */
    const { wrappedComponentRef, ...remainingProps } = props;
    return (
      <RouterContext.Consumer>
        {context => {
          return (
            <Component
              {...remainingProps} // 组件原始的props 
              {...context}        // 存在路由对象的上下文，history  location 等 
              ref={wrappedComponentRef}
            />
          );
        }}
      </RouterContext.Consumer>
    );
  };

  C.displayName = displayName;
  C.WrappedComponent = Component;
  /* 继承静态属性 */
  return hoistStatics(C, Component);
}
export default withRouter
```
## 2 渲染控制
### 渲染劫持
判断props里的visible 然后控制渲染 复用业务逻辑

```
const HOC = (WrapComponent) =>
  class Index  extends WrapComponent {
    render() {
      if (this.props.visible) {
        return super.render()
      } else {
        return <div>暂无数据</div>
      }
    }
  }
```
### 动态加载

dva 中 dynamic 就是配合 import ，实现组件的动态加载的，而且每次切换路由，都会有 Loading 效果，接下来看看大致的实现思路。

编写
```
export default function dynamicHoc(loadRouter) {
  return class Content extends React.Component {
    state = {Component: null}
    componentDidMount() {
      if (this.state.Component) return
      loadRouter()
        .then(module => module.default) // 动态加载 component 组件
        .then(Component => this.setState({Component},
         ))
    }
    render() {
      const {Component} = this.state
      return Component ? <Component {
      ...this.props
      }
      /> : <Loading />
    }
  }
}
```
使用
```
const Index = AsyncRouter(()=>import('../pages/index'))
```
实现思路：

Index 组件中，在 componentDidMount 生命周期动态加载上述的路由组件Component，如果在切换路由或者没有加载完毕时，显示的是 Loading 效果。

## 3 事件监听
HOC 不一定非要对组件本身做些什么？也可以单纯增加一些事件监听，错误监控。接下来，接下来做一个 HOC ，只对组件内的点击事件做一个监听效果。
```
import React, { useEffect, useState, useRef } from 'react'

const ClickHoc = (Component) => {
  return function Wrap(props) {
    const dom = useRef(null)
    useEffect(() => {
      const handleClick = () => console.log('发生点击事件')
      dom.current.addEventListener('click', handleClick)
      return () => dom.current.removeEventLister('click', handleClick)
    }, [])
    return (
      <div ref={dom}>
        <Component />
      </div>
    )
  }
}
const Son = ClickHoc(() => {
  return (
    <>
      <div>组件内部</div>
      <button>组件内部点击</button>
    </>
  )
})
const Test = () => {
  return (
    <>
      <button>外部点击</button>
      <div>
        <Son />
      </div>
    </>
  )
}
export default Test
```

# 高阶组件注意事项

  - 不要在函数组件内部 或者类组件render函数中使用HOC，每次会重新初始化，造成性能浪费

    错误写法
    ```
    const Father = ()=>{
        const Son = HOC(Component)
        return <><div></div><Son /></>
    }
    ```
  - 注意各个高阶组件之间的依赖关系以及嵌套顺序

# 权限拦截器的实现
