# webpack与import函数
1、首先将网站分为几个模块，每个模块对应一个chunk
2、使用import函数动态引入(Es2020标准)，webpack碰到import函数，会为动态引入的内容生成一个新的chunk
3、上述生成的新的chunk会在代码执行到import时再加载，实现动态加载、按需引入

# 按需加载和react-router

```jsx
/**
 * 
 * @param  load，组件加载函数，需要返回一个promise，在组件加载完成时resolve
 * @returns  返回一个高阶组件，封装需要异步加载的组件
 */
function getAsyncComponent(load){
  return ()=>{
    const [component,setComponet] = useState(null)
    useEffect(()=>{
      //在高阶组件 DidMount后再去执行加载真实的 需要按需加载的组件
      load().then(({default:component})=>{
        //通知高阶组件渲染子组件
        setComponet(component)
      })
    },[])
    //加载完成后，把子组件创建并返回
    return component===null?<></>:React.createElement(component)
  }
}

//根组件

const App = ()=>{
  return (
    <BroswerRouter>
      <Route path="xxx" component={getAsyncComponent(()=>{
        //这里使用import函数
        () => import(/* webpackChunkName: 'page-about' */'./pages/about')
      })} />
    </BroswerRouter>
  )
}
```

注意以上代码需要用babel进行转义