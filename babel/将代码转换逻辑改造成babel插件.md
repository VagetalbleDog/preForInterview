# 如何将一个脚本改造成babel插件

babel插件的形式就是函数返回一个对象，对象有visitor属性

```
module.exports = function(api, options) {
  return {
    visitor: {
      Identifier(path, state) {},
    },
  };
}
```
函数的第一个参数可以拿到 types、template 等常用包的 api，这样我们就不需要单独引入这些包了。

而且作为插件用的时候，并不需要自己调用 parse、traverse、generate，这些都是通用流程，babel 会做，我们只需要提供一个 visitor 函数，在这个函数内完成转换功能就行了。

函数的第二个参数 state 中可以拿到插件的配置信息 options 等，比如 filename 就可以通过 state.filename 来取。