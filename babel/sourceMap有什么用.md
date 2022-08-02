# sourceMap的作用
babel 对源码进行修改，生成的目标代码可能改动很大，如果直接调试目标代码，那么很难直接对应到源码里，所以需要一种自动关联源码的方式。

## 调试代码时定位到源码

chrome、firefox 等浏览器支持在文件末尾加上一行注释
```
//# sourceMappingURL=http://example.com/path/to/your/sourcemap.map
```
可以通过 url 的方式或者转成 base64 内联的方式来关联 sourcemap。调试工具（浏览器、vscode 等会自动解析 sourcemap，关联到源码。这样打断点、错误堆栈等都会对应到相应源码。

## 线上报错定位到源码

开发时会使用 sourcemap 来调试，但是生产可不会，要是把 sourcemap 传到生产算是大事故了。但是线上报错的时候确实也需要定位到源码，这种情况一般都是单独上传 sourcemap 到错误收集平台。

比如 sentry 就提供了一个 [@sentry/webpack-plugin](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2F%40sentry%2Fwebpack-plugin) 支持在打包完成后把 sourcemap 自动上传到 sentry 后台，然后把本地 sourcemap 删掉。还提供了 @sentry/cli 让用户可以手动上传。

平时我们至少在这两个场景（开发时调试源码，生产时定位错误）下会用到 sourcemap。

# sourceMap的格式

```
{
　　version : 3,
   file: "out.js",
   sourceRoot : "",
   sources: ["foo.js", "bar.js"],
   names: ["src", "maps", "are", "fun"],
   mappings: "AAgBC,SAAQ,CAAEA"
}
```
