# Context解决了什么问题？
主要解决props跨层级传递数据时，嵌套过深的问题，会造成无意义的渲染，props改变，子组件都会渲染。（除非用memo手动判断）
## context基本使用

### createContext

接受一个参数，作为初始化context的内容，返回一个context对象。

### provider

提供者，

  - value属性传递context的内容，供consumer使用
  - value属性改变，所有使用了value的consumer重新渲染。

```
const ThemeProvider = ThemeContext.Provider  //提供者
export default function ProviderDemo(){
    const [ contextValue , setContextValue ] = React.useState({  color:'#ccc', background:'pink' })
    return <div>
        <ThemeProvider value={ contextValue } > 
            <Son />
        </ThemeProvider>
    </div>
}
```
### consumer

  - 类式组件通过获取组件实例的context属性，获得context的内容
      ```
      const ThemeContext = React.createContext(null)
        // 类组件 - contextType 方式
      class ConsumerDemo extends React.Component{
         render(){
            const { color,background } = this.context
            return <div style={{ color,background } } >消费者</div> 
        }
      }
      ConsumerDemo.contextType = ThemeContext

      const Son = ()=> <ConsumerDemo />
      ```
 
  - 函数组件通过useContext获取**最近的**provider提供的value值

## 实现一个切换主题的demo
```
import React, { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = React.createContext(null) // 主题颜色Context

const THEME = {
  //主题颜色
  dark: { color: '#1890ff', background: '#1890ff', border: '1px solid blue', type: 'dark' },
  light: { color: '#fc4838', background: '#fc4838', border: '1px solid pink', type: 'light' }
}

const Input = ({ label }) => {
  console.log('Input渲染')
  const { color, border } = useContext(ThemeContext)
  return (
    <>
      <span style={{ color }}>{label}</span>
      <input placeholder={`请输入${label}`} style={{ border }} />
    </>
  )
}
const Button = ({ label }) => {
  console.log('Button渲染')
  const { color } = useContext(ThemeContext)
  return <button style={{ backgroundColor: color }}>{label}</button>
}
const Form = React.memo(() => {
  console.log('Form渲染')
  return (
    <>
      <Input label={'姓名'} />
      <Input label={'年龄'} />
      <Button label={'确定'} />
    </>
  )
})
const Container = () => {
  const [theme, setTheme] = useState(THEME.light)
  return (
    <>
      <button
        onClick={() => {
          if (theme === THEME.light) {
            setTheme(THEME.dark)
          } else {
            setTheme(THEME.light)
          }
        }}
      >
        切换主题
      </button>
      <ThemeContext.Provider value={theme}>
        <Form />
      </ThemeContext.Provider>
    </>
  )
}
export default Container

```