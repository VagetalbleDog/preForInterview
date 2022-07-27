## ts compiler的编译流程

[!img](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/85851ebe6f2d41a28ca3885d91beb969~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp?)

  - 词法分析，用scanner将源码拆分成一个个不可再分的单词，叫做token
  - 语法分析，用parser进行语法分析，组装成抽象语法树。
  - 语义分析，用binder进行作用域分析，checker进行类型检查
  - 如果有transformer插件，会在checker之后调用，可以对AST做各种增删改
  - 类型检查通过后，会使用Emmiter 将AST转换成js目标代码，生成类型声明文件d.ts以及sourcemap（sourcemap 的作用是映射源码和目标代码的代码位置，这样调试的时候打断点可以定位到相应的源码，线上报错的时候也能根据 sourcemap 定位到源码报错的位置。）
  

## babel的编译流程

[!img](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0b515ccf55fe4706a128ad38b50b1c24~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp?)

  - parse，通过parser进行词法分析、语法分析，生成AST和token
  - 调用transformer进行AST的转换
  - Generator将AST转换成目标代码，并生成sourcemap

## 区别？
从图中可以很容易的看出，tsc 和 babel，babel没有类型检查、也不会生成类型声明文件d.ts

### 语法支持
tsc 默认支持最新的 es 规范的语法和一些还在草案阶段的语法（比如 decorators），想支持新语法就要升级 tsc 的版本。

babel 是通过 @babel/preset-env 按照目标环境 targets 的配置自动引入需要用到的插件来支持标准语法，对于还在草案阶段的语法需要单独引入 @babel/proposal-xx 的插件来支持。

所以如果你只用标准语法，那用 tsc 或者 babel 都行，但是如果你想用一些草案阶段的语法，tsc 可能很多都不支持，而 babel 却可以引入 @babel/poposal-xx 的插件来支持。

从支持的语法特性上来说，babel 更多一些。

### 代码生成

tsc 生成的代码没有做 polyfill 的处理，想做兼容处理就需要在入口引入下 core-js（polyfill 的实现）。
```
import "core-js";

Promise.resolve;
```
babel 的 @babel/preset-env 可以根据 targets 的配置来自动引入需要的插件，引入需要用到的 core-js 模块，

## 总结
babel 和 tsc 的编译流程大同小异，都有把源码转换成 AST 的 Parser，都会做语义分析（作用域分析）和 AST 的 transform，最后都会用 Generator（或者 Emitter）把 AST 打印成目标代码并生成 sourcemap。但是 babel 不做类型检查，也不会生成 d.ts 文件。

tsc 支持最新的 es 标准特性和部分草案的特性（比如 decorator），而 babel 通过 @babel/preset-env 支持所有标准特性，也可以通过 @babel/proposal-xx 来支持各种非标准特性，支持的语言特性上 babel 更强一些。

tsc 没有做 polyfill 的处理，需要全量引入 core-js，而 babel 的 @babel/preset-env 会根据 targets 的配置按需引入 core-js，引入方式受 useBuiltIns 影响 (entry 是在入口引入 targets 需要的，usage 是每个模块引入用到的)。