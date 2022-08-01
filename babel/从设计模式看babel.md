# 访问者模式
源码 parse 成 AST 之后，需要进行 AST 的遍历和增删改（transform）。那么 transform 的流程是什么样的？

babel 会递归遍历 AST，遍历过程中处理到不同的 AST 会调用不同的 visitor 函数来实现 transform。这其实是一种设计模式，叫做访问者模式：

visitor 模式（访问者模式）是 23 种经典设计模式中的一种。visitor 模式的思想是：当被操作的对象结构比较稳定，而操作对象的逻辑经常变化的时候，通过分离逻辑和对象结构，使得他们能独立扩展。

对应到 babel traverse 的实现，就是 AST 和 visitor 分离，在 traverse（遍历）AST 的时候，调用注册的 visitor 来对其进行处理。