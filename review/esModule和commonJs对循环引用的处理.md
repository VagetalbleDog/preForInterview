# EsModule的处理
 假设有下面两个文件
  - a.js
    ```js
    import {count} from "./b.js";
    console.log(count);
    export const message = 'hello world'
    ```

  - b.js
    ```js
    import {message} from './a.js';
    setTimeout(() => {
      console.log(message)
    }, 0);
    export const count = 2022
    ```
 运行`node a.js`,打印 2022 hello
 
 运行 `node b.js`报错

 why？

 运行 a.js后，发生了什么？

 1、运行a.js 会进入b.js，这时b.js又会请求a.js，但是不会再进入a.js。因为a.js已经开始解析，但没有解析完成，会加上一个fetching的标记，不做处理继续执行。 可以理解为，这时的message会被标记为undefined。

 2、在b.js 中导出 `count = 2022`，这是b.js解析完成，回到a.js继续运行，打印 2022 并导出message = "hello world"

 3、b.js中的setTimeout执行，打印 "hello world"。

 为什么运行b就会报错？很显然呀，就是因为这个setTimeout a.js里没有


# CommonJs的处理

 假设有下面两个文件
  - a.js
    ```js
    var count=require('./b.js').count;
    console.log(count);
    exports.message='hello';
    ```

  - b.js
    ```js
    var message=require('./a.js').message;
    exports.count=5;
    setTimeout(function(){
        console.log(message);
    },0)
    ```

运行 a.js 打印 5 undefined

执行过程：

1、运行a.js，进入b.js，这时候b.js又require a.js，但是这是a.js已经加载过，commonJs的底层会把它处理成一个空对象，相当与把 `var message=require('./a.js').message;` 处理成 `var message = {}.message` 也就是说此时的message是undefined

2、b.js导出 count=5，存一个宏任务之后，回到a.js

3、打印出b.js导出的count值，5

4、导出message = ‘hello’，但不会被b所引入，因为b已经引入过了

5、setTimeout宏任务触发，打印undefined

Tips：可以通过调换顺序，打印正确的结果，因为commonJs是动态的。

# 总结 

CommonJs 和 EsModule 对于循环引用的处理大体上就是 commonJs对于加载过的模块会用一个空对象标记，EsModule会用一个fetching标记正在解析的模块，确保不会重复解析。


