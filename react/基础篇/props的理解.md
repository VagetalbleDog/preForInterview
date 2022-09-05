# Props是什么
首先应该明确一下什么是 props ，对于在 React 应用中写的子组件，无论是函数组件 FunComponent ，还是类组件 ClassComponent ，父组件绑定在它们标签里的属性/方法，最终会变成 props 传递给它们。但是这也不是绝对的，对于一些特殊的属性，比如说 ref 或者 key ，React 会在底层做一些额外的处理。

# React如何定义的props？

## 在 React 组件层级 props 充当的角色

一方面父组件 props 可以把数据层传递给子组件去渲染消费。另一方面子组件可以通过 props 中的 callback ，来向父组件传递信息。还有一种可以将视图容器作为 props 进行渲染。

## 从 React 更新机制中 props 充当的角色

在 React 中，props 在组件更新中充当了重要的角色，在 fiber 调和阶段中，diff 可以说是 React 更新的驱动器，熟悉 vue 的同学都知道 vue 中基于响应式，数据的变化，就会颗粒化到组件层级，通知其更新，但是在 React 中，无法直接检测出数据更新波及到的范围，props 可以作为组件是否更新的重要准则，变化即更新（浅比较），于是有了 PureComponent ，memo 等性能优化方案。

## 从React插槽层面props充当的角色 
React 可以把组件的闭合标签里的插槽，转化成 Children 属性。


# Props Children模式

props + children 模式 在 React 中非常常用，尤其对一些优秀开源组件库。比如 react-router 中的 Switch 和 Route ， antd 中的 Form 和 FormItem。


```
<Container>
    <Children>
</Container>
```
上述可以在 Container 组件中，通过 props.children 属性访问到 Children 组件，为 React element 对象。

作用：

1 可以根据需要控制 Children 是否渲染。

2 像上一节所说的， Container 可以用 React.cloneElement 强化 props (混入新的 props )，或者修改 Children 的子元素。

# 操作props小技巧

## 混入 props
```
function Son(props){
    console.log(props)
    return <div> hello,world </div>
}
function Father(props){
    const fatherProps={
        mes:'let us learn React !'
    }
    return <Son {...props} { ...fatherProps }  />
}
function Index(){
    const indexProps = {
        name:'alien',
        age:'28',
    }
    return <Father { ...indexProps }  />
}
```
打印

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2c6e97d8421e42b29b086b8f8d5e60df~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

Father 组件一方面直接将 Index 组件 indexProps 抽象传递给 Son，一方面混入 fatherProps

## 抽离props

有的时候想要做的恰恰和上面相反，比如想要从父组件 props 中抽离某个属性，再传递给子组件，那么应该怎么做呢？
```
function Son(props){
    console.log(props)
    return <div> hello,world </div>
}

function Father(props){
    const { age,...fatherProps  } = props
    return <Son  { ...fatherProps }  />
}
function Index(){
    const indexProps = {
        name:'alien',
        age:'28',
        mes:'let us learn React !'
    }
    return <Father { ...indexProps }  />
}
```
打印

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/51787c8ccd424afa9eeb3a857199403b~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

成功的将 indexProps 中的 age 属性抽离出来。

## 隐式注入props

这种方式，一般通过 React.cloneElement 对 props.chidren 克隆再混入新的 props 。

```
function Son(props){
     console.log(props) // {name: "alien", age: "28", mes: "let us learn React !"}
     return <div> hello,world </div>
}
function Father(prop){
    return React.cloneElement(prop.children,{  mes:'let us learn React !' })
}
function Index(){
    return <Father>
        <Son  name="alien"  age="28"  />
    </Father>
}
```

