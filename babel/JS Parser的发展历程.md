# JS Parser的历史
babel 的 parser 是基于 acorn 扩展而来的，而 acorn 也不是最早的 js parser，js parser 的历史是怎样的？ 各种 parser 之间的关系是什么样的呢？

## SpiderMonkey 和 estree标准

在 nodejs 出现之后，前端可以用 nodejs 来做一些工程化的事情，工程化需要对代码做编译、压缩、lint 等处理，也就有了对 js parser 的需求。

Mozilla 在 MDN 上公布了火狐浏览器的 JS 引擎 SpiderMonkey（c++ 写的 js 引擎）的 parser api 和 AST 标准，所以当时最早的 JS parser ---- esprima 就是基于 SpiderMonkey 的 AST 标准来实现的，后来形成了 estree 标准。 当时很多的前端领域的工具都基于 esprima。

但是到了 2015 年之后，es 标准一年一个版本，而 esprima 的更新速度跟不上，它跟不上也就导致了依赖它的一系列工具都跟不上，所以 eslint 就 fork 了一份 esprima，做了一些扩展，来自己实现新语法的 parse，这就是 espree，它依然是 estree 标准的，这是 eslint 的默认 parser。

## acorn

后面出现了 acorn，也是 estree 标准的实现，但是他的速度比 esprima 快，而且支持插件，可以通过插件扩展语法支持。正是速度快加上支持插件让很多工具都转而使用 acorn。

eslint 的 parser，也就是 espree 本来是 fork 自 esprima，但后来 espree 2.0 基于 acorn 重新实现了，也使用 acorn 的插件机制来扩展语法。

babel parser(babylon) 也选择了基于 acorn 来实现自己的 parser。

但它对 estree 标准的 AST 节点和属性都做了扩展，也提供了一些支持 typescript、jsx、flow 的语法插件（就是我们可以在 @babel/parser 的 plugins 里面指定的那些）。

## babel对 acorn对扩展

babel 基于 acorn 插件对 estree AST 做了如下扩展：

  - 把 Literal 替换成了 StringLiteral、NumericLiteral、 BigIntLiteral、 BooleanLiteral、 NullLiteral、 RegExpLiteral
  - 把 Property 替换成了 ObjectProperty 和 ObjectMethod
  - 把 MethodDefinition 替换成了 ClassMethod
  - Program 和 BlockStatement 支持了 directives 属性，也就是 'use strict' 等指令的解析，对应的 ast 是 Directive 和 DirectiveLiteral
  - ChainExpression 替换为了 ObjectMemberExpression 和 OptionalCallExpression
  - ImportExpression 替换为了 CallExpression 并且 callee 属性设置为 Import

babel parser能不断支持新的语法，就是通过修改词法分析，语法分析的代码来实现的。
