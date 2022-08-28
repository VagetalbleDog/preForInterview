# 1. Javascript的数据类型

# 2. ES6新增了哪些东西

## let const

## Map、Set、weakMap 和 weakSet

## 一些方法

```js
map
fiter
reduce
for of
for in
includes 可以找到NaN
```



# 3. Symbol

**symbol做对象属性 不可枚举 不能被对象直接访问**

**使用`Object.getOwnPropertyNames()` 获取所有属性，无论是否是可枚举**

要创建一个共享的symbol，要使用`Symbol.for()`函数，而不是`Symbol()`。

如果想要获取symbol的键，使用Symbol.keyFor()方法

我感觉Symbol的主要作用是 **迭代器**

`Symbol.iterator` 指定函数是否会返回对象的迭代器。

具有 `Symbol.iterator` 属性的对象称为可迭代对象。

在ES6中，Array、Set、Map和string都是可迭代对象。

ES6提供了for...of循环，它可以用在可迭代对象上。

JavaScript引擎首先调用`numbers`数组的 `Symbol.iterator` 方法来获取迭代器对象，然后它调用 `iterator.next()` 

```js
var iterator = numbers[Symbol.iterator]();

console.log(iterator.next()); // Object {value: 1, done: false}
console.log(iterator.next()); // Object {value: 2, done: false}
console.log(iterator.next()); // Object {value: 3, done: false}
console.log(iterator.next()); // Object {value: undefined, done: true}

```

## 自定义迭代器

```js
class List {
  constructor() {
    this.elements = [];
  }

  add(element) {
    this.elements.push(element);
    return this;
  }

  *[Symbol.iterator]() {
    for (let element of this.elements) {
      yield element;
    }
  }
}

let chars = new List();
chars.add('A')
     .add('B')
     .add('C');

// 使用Symbol.iterator实现了迭代
for (let c of chars) {
  console.log(c);
}

// A
// B
// C

```



# 4. Obejct.is()

判断两个值是否相同。 如果下列任何一项成立，则两个值相同：

两个值都是 undefined 两个值都是 null 两个值都是 true 或者都是 false 两个值是由相同个数的字符按照相同的顺序组成的字符串 两个值指向同一个对象 两个值都是数字并且 都是正零 +0 都是负零 -0 都是 NaN 都是除零和 NaN 外的其它同一个数字

```js
Object.is('foo', 'foo');     // true
Object.is(window, window);   // true

Object.is('foo', 'bar');     // false
Object.is([], []);           // false

var test = { a: 1 };
Object.is(test, test);       // true

Object.is(null, null);       // true

// 特例
Object.is(0, -0);            // false
Object.is(-0, -0);           // true
Object.is(NaN, 0/0);         // true
```

```js
if (!Object.is) {
  Object.defineProperty(Object, "is", {
    value: function (x, y) {
      // SameValue algorithm
      if (x === y) {
        // return true if x and y are not 0, OR
        // if x and y are both 0 of the same sign.
        // This checks for cases 1 and 2 above.
        return x !== 0 || 1 / x === 1 / y;
      } else {
        // return true if both x AND y evaluate to NaN.
        // The only possibility for a variable to not be strictly equal to itself
        // is when that variable evaluates to NaN (example: Number.NaN, 0/0, NaN).
        // This checks for case 3.
        return x !== x && y !== y;
      }
    }
  });
}

```



# 5. Object.create(null)

创建一个没有原型的对象

# 6. 迭代器

# 7. ES6的模块化 和 CMJ的区别，它们是如何处理循环引用的

https://juejin.cn/post/6994224541312483336#heading-20

为什么要出现模块化：

```js
1.  变量污染
2. 下层代码能够调用上层代码，到时候上层无法调用下层
```

所以出现了两个**Commonjs** 和 **Es Module**

https://www.cnblogs.com/unclekeith/archive/2017/10/17/7679503.html

## 区别（重写）

- CommonJS 模块由 JS **运行时**实现。
- CommonJs 是单个值导出，本质上导出的就是 exports 属性，**浅拷贝**。
- CommonJS 是可以动态加载的，对每一个**加载都存在缓存，可以有效的解决循环引用问题。**
- CommonJS 模块**同步加载并执**行模块文件。

`ES module` 的特性如下：

- ES6 Module **静态的，不能放在块级作用域内，代码发生在编译时。**
- ES6 Module **的值是动态绑定的，可以通过导出方法修改，可以直接访问修改结果**。
- 对于只读来说，即不允许修改引入变量的值，import的变量是只读的，不论是基本数据类型还是复杂数据类型。当模块遇到import命令时，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。
- ES6 Module 可以导出多个属性和方法，可以单个导入导出，混合导入导出。
- ES6 模块提前加载并执行模块文件，
- ES6 Module 导入模块在**严格模式**下。
- ES6 Module 的特性可以很容易实现 T**ree Shaking 和 Code Splitting**。

## 如何解决循环引用

### EsModule的处理

es6模块中的值属于【动态只读引用】

**ES6模块对导出模块，变量，对象是动态引用，遇到模块加载命令import时不会去执行模块，只是生成一个指向被加载模块的引用。**

假设有下面两个文件

- a.js

  ```
  import {count} from "./b.js";
  console.log(count);
  export const message = 'hello world'
  ```

- b.js

  ```
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

### CommonJs的处理

**循环加载时，属于加载时执行。即脚本代码在require的时候，就会全部执行。一旦出现某个模块被"循环加载"，就只输出已经执行的部分，还未执行的部分不会输出。**

假设有下面两个文件

- a.js

  ```
  var count=require('./b.js').count;
  console.log(count);
  exports.message='hello';
  ```

- b.js

  ```
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

### 总结

CommonJs 和 EsModule 对于循环引用的处理大体上就是 commonJs对于加载过的模块会用一个空对象标记，EsModule会用一个fetching标记正在解析的模块，确保不会重复解析。







# 8. 数组的方法，哪些改变原数组以及各自的的返回值

![数组1](D:\秋招\共同复习\preForInterview\JS基础.assets\bH3iMtQCasWBVz5.png)



# 9.对象的方法

1. obejct.defineProperty()
2. object.freeze()

# 10. weakMap 和 Map

# 11. JS的垃圾回收机制

# 12. for in  和  for of的区别

它们两者都可以用于遍历，不过`for in`遍历的是数组的索引（`index`），而`for of`遍历的是数组元素值（`value`）

#### [for in](https://kiraraty.github.io/fe-doc/#/八股/javascript基础?id=for-in)

`for in`更适合遍历对象，当然也可以遍历数组,但是存在一些问题

`index`索引为字符串型数字，不能直接进行几何运算

```js
var arr = [1,2,3]
    
for (let index in arr) {
  let res = index + 1
  console.log(res)
}
//01 11 21CopyErrorCopied
```

使用`for in`会遍历数组所有的可枚举属性，包括原型，如果不想遍历原型方法和属性的话，可以在循环内部判断一下，使用`hasOwnProperty()`方法可以判断某属性是不是该对象的实例属性

`hasOwnProperty()` 方法会返回一个布尔值，指示对象自身属性中是否具有指定的属性（也就是，是否有指定的键）。

#### [for of](https://kiraraty.github.io/fe-doc/#/八股/javascript基础?id=for-of)

`for of`遍历的是数组元素值，而且`for of`遍历的只是数组内的元素，不包括原型属性和索引

`for of`适用遍历数/数组对象/字符串/`map`/`set`等拥有迭代器对象（`iterator`）的集合，但是不能遍历对象，因为没有迭代器对象，但如果想遍历对象的属性，你可以用`for in`循环（这也是它的本职工作）或用内建的`Object.keys()`方法

```javascript
var myObject={
　　a:1,
　　b:2,
　　c:3
}
for (var key of Object.keys(myObject)) {
  console.log(key + ": " + myObject[key]);
}
//a:1 b:2 c:3CopyErrorCopied
```

#### [实现for of 遍历对象](https://kiraraty.github.io/fe-doc/#/八股/javascript基础?id=实现for-of-遍历对象)

for-of在object对象上暂时没有实现，但是我们可以通过Symbol.iterator给对象添加这个塑性，我们就可以使用for-of了

```js
var p={
    name:'kevin',
    age:2,
    sex:'male'
}
Object.defineProperty(p,Symbol.iterator,{
    enumberable:false,
    configurable:false,
    writable:false,
    value:function(){
        var _this=this;
        var nowIndex=-1;
        var key=Object.keys(_this);
        return {
            next:function(){
                nowIndex++;
                return {
                    value:_this[key[nowIndex]],
                    done:(nowIndex+1>key.length)
                }
            }
        }
    }
})
}
//这样的话就可以直接通过for-of来遍历对象了
for(var i of p){
  console.log(i)
}
//kevin,2,maleCopyErrorCopied
```

其实for-of的原理最终也是通过调用p[Symbol.iterator](https://kiraraty.github.io/fe-doc/#/)这个函数，这个迭代器函数返回一个next函数，for循环会不断调用next 那么知道原理之后，我们可以自己来调用iterator.next来实现循环

```js
var students = {}
students[Symbol.iterator] = function() {
  let index = 1;
  return {
    next() {
      return {done: index>100, value: index++}
    }
  }
}
var iterator = students[Symbol.iterator]();
var s=iterator.next();
while(!s.done) {
  console.log(s.value);
  s=iterator.next();
}
CopyErrorCopied
```

上例中使用 iterator.next 和 while 结合实现了 for循环。 除了使用iterator 之外，我们还可以使用 yield 语法来实现循环，yield相对简单一些，只要通过 yield 语句把值返回即可：

```js
let students = {
  [Symbol.iterator]: function*() {
    for(var i=0;i<=100;i++) {
      yield i;
    }
  }
}
for(var s of students) {
  console.log(s);
}
//这个yield其实最后返回的就是iterator函数CopyErrorCopied
```

#### [总结](https://kiraraty.github.io/fe-doc/#/八股/javascript基础?id=总结)

**for in遍历的是数组的索引（即键名），而for of遍历的是数组元素值**

**for in总是得到对象的key或数组、字符串的下标**

**for of总是得到对象的value或数组、字符串的值**

# 13. 闭包

防抖节流、柯里化、私有化。

# 14. 闭包陷阱

# 15. EventLoop

# 16. Promise

# 17. 0.1 + 0.2 === 0.3？ 怎么解决

```javascript
(n1 + n2).toFixed(2) // 注意，toFixed为四舍五入
```

计算机是通过二进制的方式存储数据的，所以计算机计算0.1+0.2的时候，实际上是计算的两个数的二进制的和。

在 JavaScript 中只有一种数字类型：Number，它的实现遵循IEEE 754标准，使用**64位固定长度**来表示，也就是标准的double双精度浮点数。在二进制科学表示法中，双精度浮点数的**小数部分最多只能保留52位**，再加上前面的1，其实就是保留53位有效数字，剩余的需要舍去，遵从“0舍1入”的原则

遵循IEEE 754标准，使用**64位固定长度**来表示，也就是标准的double双精度浮点数。在二进制科学表示法中，双精度浮点数的**小数部分最多只能保留52位**，再加上前面的1，其实就是保留53位有效数字，剩余的需要舍去，遵从“0舍1入”的原则

![image-20220823133144875](D:\秋招\共同复习\preForInterview\JS基础.assets\image-20220823133144875.png)

- 第一部分（蓝色）：用来存储符号位（sign），用来区分正负数，0表示正数，**占用1位**
- 第二部分（绿色）：用来存储指数（exponent），**占用11位**
- 第三部分（红色）：用来存储小数（fraction），**占用52位**

实现0.1+0.2=0.3,一个直接的解决方法就是设置一个误差范围，通常称为“机器精度”。对JavaScript来说，这个值通常为2-52，在ES6中，提供了`Number.EPSILON`属性，而它的值就是2^-52，只要判断`0.1+0.2-0.3`是否小于`Number.EPSILON`，如果小于，就可以判断为0.1+0.2 ===0.3

```javascript
function numberepsilon(arg1,arg2){                   
  return Math.abs(arg1 - arg2) < Number.EPSILON;        
}        
console.log(numberepsilon(0.1 + 0.2, 0.3)); // true
```

# 18. 如何判断数据类型

# 19. == 会如何转换？

![image-20220823133453981](D:\秋招\共同复习\preForInterview\JS基础.assets\image-20220823133453981.png)

- `NaN` 不等于任何其它类型
- `Boolean` 参与比较，`Boolean` 的值会被转换为 `Number`
- `String` 与 `Number` 比较,`String` 转化为 `Number`
- `null` 与 `undefined` 进行比较结果为 true
- `null` , `undefined` 与其它任何类型进行比较结果都为 false
- `引用类型` 与 `值类型` 比较,引用类型先转换为 `原始值`( ToPrimitive )
- `引用类型` 与 `引用类型`，直接判断是否指向同一对象

**对象转原始类型**

> 对象在转换类型的时候，会调用内置的 `[[ToPrimitive]]` 函数，对于该函数来说，算法逻辑一般来说如下

- 如果已经是原始类型了，那就不需要转换了
- 调用 `x.valueOf()`，如果转换为基础类型，就返回转换的值
- 调用 `x.toString()`，如果转换为基础类型，就返回转换的值
- 如果都没有返回原始类型，就会报错

自己也可以重写toPrimitive，且优先级高

```js
let a = {
  valueOf() {
    return 0
  },
  toString() {
    return '1'
  },
  [Symbol.toPrimitive]() {
    return 2
  }
}
1 + a // => 3
```

**四则运算符**

> 它有以下几个特点：

- 运算中其中一方为字符串，那么就会把另一方也转换为字符串
- 如果一方不是字符串或者数字，那么会将它转换为数字或者字符串

```js
1 + '1' // '11'
true + true // 2
4 + [1,2,3] // "41,2,3"CopyErrorCopied
```

- 对于第一行代码来说，触发特点一，所以将数字 `1` 转换为字符串，得到结果 `'11'`
- 对于第二行代码来说，触发特点二，所以将 `true` 转为数字 `1`
- 对于第三行代码来说，触发特点二，所以将数组通过 `toString`转为字符串 `1,2,3`，得到结果 `41,2,3`
- **那么对于除了加法的运算符来说，只要其中一方是数字，那么另一方就会被转为数字**

```js
4 * '3' // 12
4 * [] // 0
4 * [1, 2] // NaNCopyErrorCopied
```

**比较运算符**

- 如果是对象，就通过 `toPrimitive` 转换对象
- 如果是字符串，就通过 `unicode` 字符索引来比较

```js
let a = {
  valueOf() {
    return 0
  },
  toString() {
    return '1'
  }
}
a > -1 // trueCopyErrorCopied
```

> 在以上代码中，因为 `a` 是对象，所以会通过 `valueOf` 转换为原始类型再比较值

![image-20220823134301901](D:\秋招\共同复习\preForInterview\JS基础.assets\image-20220823134301901.png)

这里比较费解的是，为何 `{}+[]` 等于 `0`？原因是这里的 `{}` 会识别为空语句块，从而 `+` 用为一元运算符，其含义是将运算值转换为 number。所以 `{}+[]` → `+[]` → `+""` → `0`。

# 20. 原型 和 原型链

直接看这个文章：https://juejin.cn/post/6934498361475072014#heading-7。

记住那张图就行

![image-20220802162347825](D:\秋招\共同复习\preForInterview\JS基础.assets\image-20220802162347825.png)

# 21. DOM解析对象时的回调事件

[深入理解DOM事件类型系列第六篇——加载事件 - 小火柴的蓝色理想 - 博客园 (cnblogs.com)](https://www.cnblogs.com/xiaohuochai/p/6375372.html)

# 22. 事件流、事件委托

![image-20220823143653376](D:\秋招\共同复习\preForInterview\JS基础.assets\image-20220823143653376.png)

通常，我们将这种事件流向分为三个阶段：**捕获阶段，目标阶段，冒泡阶段**。

捕获阶段是指事件响应从最外层的Window开始，逐级向内层前进，直到具体事件目标元素。在捕获阶段，不会处理响应元素注册的冒泡事件。

实际操作中，我们可以通过 element.addEventListener() 设置一个元素的事件模型为冒泡事件或者捕获事件。 先来看一下 addEventListener 函数的语法：

```js
element.addEventListener(type, listener, useCapture)
```

- type 监听事件类型的字符串
- listener 事件监听回调函数，即事件触发后要处理的函数
- useCapture 默认值false，表示事件冒泡；设为true时，表示事件捕获

原理：不再给每个子节点单独设置事件监听器，而是事件监听器设置在父节点上，然后利用冒泡原理影响每个子节点。

**DOM事件流有3个阶段：捕获阶段，目标阶段，冒泡阶段；三个阶段的顺序为：捕获阶段——目标阶段——冒泡阶段；**

**对于非目标阶段的元素，事件响应执行顺序遵循先捕获后冒泡的原则；通过暂缓执行捕获事件，可以达到先冒泡后捕获的效果；**

**对于目标元素，事件响应执行顺序根据的事件的执行顺序执行；**

**事件捕获是从顶层的Window逐层向内执行，事件冒泡则相反；**

**事件委托（事件代理）是根据事件冒泡或事件捕获的机制来实现的。**





# 23. call、apply 和 bind的区别

# 24. 箭头函数和普通函数的区别

# 25. this的指向问题

# 26. 深拷贝和浅拷贝

# 27. [] !== []

![image-20220822215717465](D:\秋招\共同复习\preForInterview\JS基础.assets\image-20220822215717465.png)

- `NaN` 不等于任何其它类型
- `布尔类型` 参与比较，`布尔类型` 的值会被转换为 `数字类型`
- `String` 与 `Number` 比较,`String` 转化为 `Number`
- `null` 与 `undefined` 进行比较结果为 true
- `null` , `undefined` 与其它任何类型进行比较结果都为 false
- `引用类型` 与 `值类型` 比较,引用类型先转换为 `原始值`( ToPrimitive )
- `引用类型` 与 `引用类型`，直接判断是否指向同一对象

```js
let a = {
    x:1,
    valueOf(){
        return a.x++
    }
}
a == 1 && a == 2 && a == 3       => true

表达式执行，从左到右执行 a == 1 时 a 会转化为原始值(ToPrimitive(a, Number)) 找到自己构造函数原型上的 valueOf ，我们 a 创建了一个 valueOf 方法，根据原型链查找机制使用的是我们定义的valueOf , 执行 a.valueOf 返回结果时 1 所以 a == 1` `第二次执行 a == 2 , 因为我们 valueOf return a.x++ 先赋值后自增 第一次执行完a.x的之久发生改变 a == 2 成立,依次往后比较...

```

```js
    Number(null)                          //=> 0
    Number(undefined)                     //=> NaN
    Number([])                            //=> 0
    Number({})                            //=> NaN
    Number(true)                          //=> 1
    Number('')                            //=> 0
```

[] == ![]结果是什么？

- `==` 中，左右两边都需要转换为数字然后进行比较
- `[]`转换为数字为`0`
- `![]` 首先是转换为布尔值，由于`[]`作为一个引用类型转换为布尔值为`true`
- 因此`![]`为`false`，进而在转换成数字，变为`0`
- `0 == 0` ， 结果为`true`

# 28. 浏览器渲染进程

# 类型检查方式

## typeof

```js
console.log(typeof 2);               // number
console.log(typeof true);            // boolean
console.log(typeof 'str');           // string

console.log(typeof function(){});    // function
console.log(typeof []);              // object    
console.log(typeof {});              // object

console.log(typeof undefined);       // undefined
console.log(typeof null);            // object

```

**null的类型标签也是000，和Object的类型标签一样，所以会被判定为Object**。我感觉这样是合理的

## instanceof

`instanceof`可以正确判断对象的类型，**其内部运行机制是判断在其原型链中能否找到该类型的原型**。

```javascript
console.log(2 instanceof Number);          // false
console.log(true instanceof Boolean);      // false 
console.log('str' instanceof String);      // false 
 
console.log([] instanceof Array);          // true
console.log(function(){} instanceof Function); // true
console.log({} instanceof Object);            // true
```

可以看到，`instanceof`**只能正确判断引用数据类型**，而不能判断基本数据类型。`instanceof` 运算符可以用来测试一个对象在其原型链中是否存在一个构造函数的 `prototype` 属性。

## constructor

```javascript
console.log((2).constructor === Number); // true
console.log((true).constructor === Boolean); // true
console.log(('str').constructor === String); // true
console.log(([]).constructor === Array); // true
console.log((function() {}).constructor === Function); // true
console.log(({}).constructor === Object); // true
```

如果创建一个对象来改变它的原型，`constructor`就不能用来判断数据类型了

## 最好的 Object.prototype.toString.call()

```javascript
var a = Object.prototype.toString;
 
console.log(a.call(2));              // [object Number]
console.log(a.call(true));           //[object Boolean]
console.log(a.call('str'));            //[object String]
console.log(a.call([]));            //[object Array]
console.log(a.call(function(){}));   //[object Function] 
console.log(a.call({}));            //[object Object]
console.log(a.call(undefined));        //[object Undefined]
console.log(a.call(null));            //[object Null]
```

同样是检测对象obj调用toString方法，`obj.toString()`的结果和`Object.prototype.toString.call(obj)`的结果不一样，这是为什么？

这是因为toString是Object的原型方法，而Array、function等**类型作为Object的实例，都重写了toString方法**。**不同的对象类型调用toString方法时，根据原型链的知识，调用的是对应的重写之后的toString方法**（function类型返回内容为函数体的字符串，Array类型返回元素组成的字符串…），而不会去调用Object上原型toString方法（返回对象的具体类型），所以采用obj.toString()不能得到其对象类型，只能将obj转换为字符串类型；因此，在想要得到对象的具体类型时，应该调用Object原型上的toString方法。

# null 和 undefined的区别

首先 Undefined 和 Null 都是基本数据类型，**这两个基本数据类型分别都只有一个值，就是 undefined 和 null。**

undefined 代表的含义是**未定义**，null 代表的含义是**空对象**。一般变量声明了但还没有定义的时候会返回 undefined，null主要用于赋值给一些可能会返回对象的变量，作为初始化。

undefined 在 JavaScript 中不是一个保留字，这意味着可以使用 undefined 来作为一个变量名，但是这样的做法是非常危险的，它会影响对 undefined 值的判断。我们可以通过一些方法获得安全的 undefined 值，比如说 void 0。

当对这两种类型使用 typeof 进行判断时，Null 类型化会返回 “object”，这是一个历史遗留的问题。**当使用双等号对两种类型的值进行比较时会返回 true，使用三个等号时会返回 false。**

# 事件对象

```js
.target与this的区别：
    事件对象名.target : 指向的是我们点击的那个对象，谁点击了这个事件
    this : 指向绑定的事件
    e.type ：返回事件类型
    e.preventDefault(); : 阻止默认行为
    e.stopPropagation(); 阻止冒泡 //有兼容性问题
    window.event.cancelBubble = true; 阻止冒泡 //适用于ie678
```

# BOM

```js
1. window：表示浏览器实例
2. location：加载文档的信息和常用导航功能实例
3. navigator：客户端标识和信息的对象实例
4. screen：客户端显示器信息
5. history：当前窗口建立以来的导航历史记录
```

有时间看看，没时间就算了。

## history

```javascript
// 跳转到最近的 xxx 页面
history.go("xxx");
ry.back();

// 前进一页
history.forward()
```

1. `hashchange` 事件：页面 URL 的散列变化时被触发
2. `history.pushState()` 方法：接收 3 个参数：一个 state 对象、一个新状态的标题和一个（可选的）相对 URL
3. `popstate` 事件（在 `window` 对象上）：后退时触发
4. `history.state` 属性：当前的历史记录状态
5. `history.replaceState()` 方法：接收与 `pushState()` 一样的前两个参数来更新状态

## location

`location` 是最有用的 BOM 对象之一，提供了当前窗口中加载文档的信息，以及通常的导航功能。

> 它既是 `window` 的属性，也是 `document` 的属性。即 `window.location` 和 `document.location` 指向同一个对象。

| 属性                  | 值                                                           | 说明                                     |
| --------------------- | ------------------------------------------------------------ | ---------------------------------------- |
| `location.hash`       | "#contents"                                                  | URL 散列值（井号后跟零或多个字符）可为空 |
| `location.host`       | "[www.wrox.com:80](https://link.juejin.cn/?target=http%3A%2F%2Fwww.wrox.com%3A80)" | 服务器名及端口号                         |
| `location.hostname`   | "[www.wrox.com](https://link.juejin.cn/?target=http%3A%2F%2Fwww.wrox.com)" | 服务器名                                 |
| `location.href`       | "[www.wrox.com:80/WileyCDA/?q…](https://link.juejin.cn/?target=http%3A%2F%2Fwww.wrox.com%3A80%2FWileyCDA%2F%3Fq%3Djavascript%23contents)" | 完整 URL 字符串                          |
| `location.pathname`   | "/WileyCDA/"                                                 | URL 中的路径和（或）文件名               |
| `location.port`       | "80"                                                         | 请求端口号                               |
| `location.protocol`   | "http:"                                                      | 页面使用的协议                           |
| `location.search`     | "?q=javascript"                                              | 查询字符串，以问号开头                   |
| `location.username`   | "foouser"                                                    | 域名前指定的用户名                       |
| `location.password`   | "barpassword"                                                | 域名前指定的密码                         |
| `location.haoriginsh` | "[www.wrox.com](https://link.juejin.cn/?target=http%3A%2F%2Fwww.wrox.com)" | 源地址，只读                             |

修改浏览器地址可以通过四种方式来修改：

1. `location.assign()`
2. `location.replace()`
3. `location.href = newLocation`
4. `window.location = newLocation`

其中 `location.href` 和 `window.location` 都会在内部显式调用 `location.assign()` 方法，并且向浏览器历史记录中增加一条记录。点击浏览器 "后退" 按钮可以回到上页。

而 `location.replace()` 可以直接修改地址重载页面，而不会向历史记录中插入数据，也无法返回上页。

另外 `location` 还提供了一个 `reload()` 方法，用来重载当前页面

# setTimout模拟 setinterval

```javascript
let num = 0;
let max = 10;
let incrementNumber = function() {
    num++;
    // 如果还没有达到最大值，再设置一个超时任务
    if (num < max) {
        setTimeout(incrementNumber, 500);
    } else {
        alert("Done");
    }
}
setTimeout(incrementNumber, 500);
```

为什么不直接使用setinterval呢?

https://www.cnblogs.com/chenjg/p/9657574.html

如果 `setInterval()` 定义时传入的函数时一个异步请求 `Promise`，则异步请求后的回调函数执行顺序可能不会按照预想顺序执行。所以这种情况推荐使用超时任务 `setTimeout()` 而非 `setInterval()`



# 那几个不好记忆的值

## 浏览器窗口大小

浏览器窗口大小不好确认，但是可以用 `document.documentElement.clientWidth` 和 `document.documentElement.clientHeight` 来确认可视窗口的大小。



# axios fetch ajax的区别

传统 Ajax 指的是 XMLHttpRequest（XHR）， 最早出现的发送后端请求技术，隶属于原始js中，核心使用XMLHttpRequest对象，多个请求之间如果有先后关系的话，就会出现**回调地狱**。

**axios：**

```js
axios({
    method: 'post',
    url: '/user/12345',
    data: {
        firstName: 'Fred',
        lastName: 'Flintstone'
    }
})
.then(function (response) {
    console.log(response);
})
.catch(function (error) {
    console.log(error);
});

```

 axios 是一个基于Promise 用于浏览器和 nodejs 的 HTTP 客户端，本质上也是对原生XHR的封装，只不过它是Promise的实现版本，符合最新的ES规范，它本身具有以下特征： 1.从浏览器中创建 XMLHttpRequest 2.支持 Promise API 3.客户端支持防止CSRF 4.**提供了一些并发请求的接口**（重要，方便了很多的操作） 5.从 node.js 创建 http 请求 6**.拦截请求和响应** 7.转换请求和响应数据 8.取消请求 9.自动转换JSON数据 **防止CSRF:就是让你的每个请求都带一个从cookie中拿到的key, 根据浏览器同源策略，假冒的网站是拿不到你cookie中得key的，这样，后台就可以轻松辨别出这个请求是否是用户在假冒网站上的误导输入，从而采取正确的策略。**

**fetch**

```js
try {
  let response = await fetch(url);
  let data = response.json();
  console.log(data);
} catch(e) {
  console.log("Oops, error", e);
}
```

fetch号称是AJAX的替代品，是在ES6出现的，使用了ES6中的promise对象。Fetch是基于promise设计的。Fetch的代码结构比起ajax简单多了，参数有点像jQuery ajax。但是，一定记住**fetch不是ajax的进一步封装，而是原生js，没有使用XMLHttpRequest对象**。 fetch的优点： 1.符合关注分离，没有将输入、输出和用事件来跟踪的状态混杂在一个对象里 2.更好更方便的写法 坦白说，上面的理由对我来说完全没有什么说服力，因为不管是Jquery还是Axios都已经帮我们把xhr封装的足够好，使用起来也足够方便，为什么我们还要花费大力气去学习fetch？ 我认为fetch的优势主要优势就是：

1. 语法简洁，更加语义化
2. 基于标准 Promise 实现，支持 async/await
3. 同构方便，使用 [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch) 4.更加底层，提供的API丰富（request, response） 5.脱离了XHR，是ES规范里新的实现方式

最近在使用fetch的时候，也遇到了不少的问题： fetch是一个低层次的API，你可以把它考虑成原生的XHR，所以使用起来并不是那么舒服，需要进行封装。 例如：

1）fetch只对网络请求报错，对400，500都当做成功的请求，服务器返回 400，500 错误码时并不会 reject，只有网络错误这些导致请求不能完成时，fetch 才会被 reject。 2）fetch默认不会带cookie，需要添加配置项： fetch(url, {credentials: 'include'}) 3）fetch不支持abort，不支持超时控制，使用setTimeout及Promise.reject的实现的超时控制并不能阻止请求过程继续在后台运行，造成了流量的浪费 4）fetch没有办法原生监测请求的进度，而XHR可以

**总结：axios既提供了并发的封装，也没有fetch的各种问题，而且体积也较小，当之无愧现在最应该选用的请求的方式。**

# JS的延时加载

一般有以下几种方式：

- defer 属性
- async属性
- 动态创建DOM方式
- 使用jquery的getScript方法
- 使用settimeout延迟方法
- 让js最后加载。

```js
<script type="text/javascript">  
   function testLoad() {  
       console.log("11");
        //.....这里可以写向后端的请求
   }  
   (function(){
        setTimeote(function(){            testLoad();
        }, 1000); //延迟一秒加载    })()
</script>  
```

把js外部引入的文件的标签放到页面底部，来让js最后引入，从而加快页面加载速度。

# Object常见方法

## 1. Object.assign(target,source1,source2,...)

该方法主要用于对象的合并，将**源对象source的所有可枚举属性合并到目标对象target上**,此方法只**拷贝源对象**的自身属性，**不拷贝继承的属性**。 Object.assign方法实行的是浅拷贝，而不是深拷贝。也就是说，**如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用。同名属性会替换。 Object.assign只能进行值的复制，如果要复制的值是一个取值函数，那么将求值后再复制。** Object.assign可以用来处理数组，但是会把数组视为对象。

```js
const target = { x : 0,y : 1};
const source = { x : 1,z : 2 ,fn : {number : 1}};
console.log(Object.assign(target, source));
// target  {x : 1, y : 1, z : 2, fn : {number : 1}}    // 同名属性会被覆盖
target.fn.number = 2;
console.log(source)// source  {x : 1, z : 2, fn : {number : 2}}   // 拷贝为对象引用

function Person(){
  this.name = 1
};
Person.prototype.country = 'china';
var student = new Person();
student.age = 29 ;
const young = {name : 'zhang'};
Object.assign(young,student);
// young {name : 'zhang', age : 29}               // 只能拷贝自身的属性，不能拷贝prototype

Object.assign([1, 2, 3], [4, 5])                      // 把数组当作对象来处理
// [4, 5, 3]
```

## 2. Object.freeze()

冻结一个对象，冻结指的是不能向这个对象添加新的属性，不能修改其已有属性的值，不能删除已有属性，以及不能修改该对象已有属性的可枚举性、可配置性、可写性。也就是说，这个对象永远是不可变的。该方法返回被冻结的对象。

## 3. Object.preventExtensions()

对象不能再添加新的属性。可修改，删除现有属性，不能添加新属性。

# 判断对象是否为空

1.将json对象转化为json字符串，再判断该字符串是否为"{}"

```js
var data = {};
var b = (JSON.stringify(data) == "{}");
alert(b);//trueCopyErrorCopied
```

2.for in 循环判断

```javascript
var obj = {};
var b = function() {
    for(var key in obj) {
        return false;
    }
    return true;
}
alert(b());//trueCopyErrorCopied
```

3.Object.getOwnPropertyNames()方法

此方法是使用Object对象的getOwnPropertyNames方法，获取到对象中的属性名，存到一个数组中，返回数组对象，我们可以通过判断数组的length来判断此对象是否为空。**注意symbol**

注意：此方法不兼容ie8，其余浏览器没有测试

```js
var data = {};
var arr = Object.getOwnPropertyNames(data);
alert(arr.length == 0);//trueCopyErrorCopied
```



# 三种创建对象方式的对比

- 字面量和`new`关键字创建的对象是`Object`的实例，原型指向`Object.prototype`，继承内置对象`Object`
- `Object.create(arg, pro)`创建的对象的原型取决于`arg`，`arg`为`null`，新对象是空对象，没有原型，不继承任何对象；`arg`为指定对象，新对象的原型指向指定对象，继承指定对象

# JSON

语法：

- 数据为 键/值 对。
- 数据由逗号分隔。
- 大括号保存对象
- 方括号保存数组

手写两个方法：

请看手写题

