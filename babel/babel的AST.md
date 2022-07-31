# 常见的AST节点
## Literal 字面量
Literal是字面量的意思，`let name = 'zwf'` 中 'zwf'就是一个字符串字面量(StringLiteral)，相应的还有数字字面量、布尔字面量、字符串字面量等。

[!img](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/29185815036a4ea1878484ba773a3b6e~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

## Identifier 标识符
Identifier是标识符的意思， **变量名**、**属性名**、**函数参数名**

## Statement 语句

是可以独立执行的单位

每一条可以独立执行的语句都是Statement，包括 break、continue、return、debugger等

语句是代码执行的最小单位

## Declaration 声明

一类特殊的语句，执行的逻辑是在作用域内，声明一个变量、函数、class、import、export等等
举例：
```
const a=1
function b(){}
class c {}
export default a
```
## Expression 表达式

特点：执行完之后有返回值
```
a=1
[1,2,3]
1+2
-1;
this;
super;
```
## Class
class的语法也有专门的AST节点来表示

classBody分为三部分

 - classProperty 代表了类中的属性
 - classMethod(kind='constructor') 构造器方法
 - classMethod(kind='method') 常规方法，包括成员方法和静态方法

## Import、Export

各有三种

named import、default import、namespaced import

## Program & Directive

program有body属性存放statement数组，还有Directive，Directive是代码中的指令部分，比如说 use strict


# AST用处
学会AST，就可以把代码转为对AST的操作了，这是编译、静态分析的第一步。

