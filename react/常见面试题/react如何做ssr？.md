# 什么是ssr
csr：客户端渲染，用户请求index.html index.html里会包含js的链接，然后下载引入js文件，通过执行js文件来帮我们渲染页面。
ssr：服务端渲染，用户请求，服务端直接返回已经渲染好的页面，在服务端执行js逻辑进行渲染。

# 什么是同构？
同构应用就是一套代码，服务端和浏览器端都可以运行，node的出现（node就是运行在服务端的javaScript），让前端的同构应用成为了可能。

# ssr的好处是啥
  - 提高网页的seo(目前仅谷歌支持对csr页面的seo)
  - 减少用户的首屏等待事件
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0ff85dc9c2d147088a988bca3f8d1897~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)
# ssr的思路和实现

核心概念：同构

1、用户请求，我们先让react代码在服务端执行一遍，将执行结果插入到即将返回给浏览器的html中，将html返回给浏览器渲染，浏览器拿到之后可以先展示页面，此时网页不可用。

2、react代码在客户端再执行一遍，为html页面中的内容添加数据和事件绑定

流程图：
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2661464e9fa849dba712085c8ab31e00~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

# 核心API

服务端：使用 `ReactDomServer.renderToString` `ReactDomServer.renderToNodeStream`

客户端：使用 `reactDom.hydrate` 根据服务端返回的html进行hydrate操作。（hydrate 是 React 中提供在初次渲染的时候，去复用原本已经存在的 DOM 节点，减少重新生成节点以及删除原本 DOM 节点的开销，来加速初次渲染的功能）**这时才会绑定事件**

# 在SSR项目中渲染组件

1、用户请求node服务器，node服务器调用renderToString方法，将react组件渲染成html，并插入到事先准备好的字符串模板中，返回给客户端。

2、客户端拿到html先进行渲染，这个html会包含接下来需要执行的react代码，调用react.hydrate方法（类似于react.render，但是会对重复节点复用，加快渲染效率，进行事件绑定）

Tips：由于react的jsx代码不能直接运行，所以不管是在服务端还是客户端都要调用babel进行代码的编译。

# 在SSR项目中使用数据同构

数据同构：

    在服务端渲染的时候就去API服务器请求数据，因为一些组件是需要数据才能渲染的，这就要求服务端再返回html之前就已经完成了接口的调用，而这些准备好的数据，客户端也不用重复请求。

    1、服务器返回渲染好的html时，需要完成请求，并且携带数据。
    2、浏览器接管页面的时候，需要拿到这个数据，不至于重复请求。
    3、浏览器接管页面之后，如果从其他路由跳到这个路由（或者刷新），需要重新发起请求

