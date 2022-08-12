# css 模块化主要解决了什么问题？
css 模块化一直是 React 痛点，为什么这么说呢？ 因为 React 没有像 Vue 中 style scoped 的模版写法，可以直接在 .vue 文件中声明 css 作用'域'。随着 React 项目日益复杂化、繁重化，React 中 css 面临很多问题，比如样式类名全局污染、命名混乱、样式覆盖等。
# css module
主要是用webpack，css-loader、less-loader等。
  - 可以在项目中配置，自定义模块名称、加密规则等
  - CSS Modules 允许使用 :global(.className) 的语法，声明一个全局类名
  - CSS Modules 还提供一种显式的局部作用域语法:local(.text)，等同于.text。

less webpack配置
```
{
     test: /\.less$/,
     use:[
        {
          loader: 'css-loader',
          options:{
                modules: {
                    localIdentName:'[path][name]---[local]---[hash:base64:5]'
                },
          },
        },
        {
            // 可能是其他 loader, 不过不重要。
        },
        'less-loader'
     ]
}
CSS Modules 优点：

  - CSS Modules 的类名都有自己的私有域的，可以避免类名重复/覆盖，全局污染问题。
  - 引入 css 更加灵活，css 模块之间可以互相组合。
  - class 类名生成规则配置灵活，方便压缩 class 名。


```
# css in js 

用纯js的方法来写样式（js对象）

  - 可以用拓展运算符灵活的操作样式
  - 使用第三方库，更快的写css in js，比方说styled component（原理）

好处：
  - 样式扩展语法上更加灵活，js的模块化支持本身就好
  - 无需配置webpack的loader
  - 从根本上避免了全剧污染、样式混乱等问题