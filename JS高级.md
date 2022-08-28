[ES6 入门教程 - ECMAScript 6入门 (ruanyifeng.com)](https://es6.ruanyifeng.com/#README)

主要是对Promise知识的总结

# let、const、var的区别

**1）块级作用域：** 块作用域由 `{ }`包括，let和const具有块级作用域，var不存在块级作用域。块级作用域解决了ES5中的两个问题：

- 内层变量可能覆盖外层变量
- 用来计数的循环变量泄露为全局变量

**（2）变量提升：** var存在变量提升，let和const不存在变量提升，即在变量只能在声明之后使用，否在会报错。

**（3）给全局添加属性：** 浏览器的全局对象是window，Node的全局对象是global。var声明的变量为全局变量，并且会将该变量添加为全局对象的属性，但是let和const不会。

**（4）重复声明：** var声明变量时，可以重复声明变量，后声明的同名变量会覆盖之前声明的遍历。const和let不允许重复声明变量。

**（5）暂时性死区：** 在使用let、const命令声明变量之前，该变量都是不可用的。这在语法上，称为**暂时性死区**。使用var声明的变量不存在暂时性死区。

**（6）初始值设置：** 在变量声明时，var 和 let 可以不用设置初始值。而const声明变量必须设置初始值。

**（7）指针指向：** let和const都是ES6新增的用于创建变量的语法。 let创建的变量是可以更改指针指向（可以重新赋值）。但const声明的变量是不允许改变指针的指向。

| **区别**           | **var** | **let** | **const** |
| ------------------ | ------- | ------- | --------- |
| 是否有块级作用域   | ×       | ✔️       | ✔️         |
| 是否存在变量提升   | ✔️       | ×       | ×         |
| 是否添加全局属性   | ✔️       | ×       | ×         |
| 能否重复声明变量   | ✔️       | ×       | ×         |
| 是否存在暂时性死区 | ×       | ✔️       | ✔️         |
| 是否必须设置初始值 | ×       | ×       | ✔️         |
| 能否改变指针指向   | ✔️       | ✔️       | ×         |

## 变量提升的高级知识



# 箭头函数

1. 没有自己的this

   对于一般函数：

   - 如果该函数是一个构造函数，this 指针指向一个新的对象
   - 在严格模式下的函数调用下，this 指向`undefined`
   - 如果该函数是一个对象的方法，则它的 this 指针指向这个对象

   > 箭头函数不会创建自己的this,它只会从自己的作用域链的上一层继承this

   **对象不是作用域**

   所以对象内的箭头函数作用域是外部

   而正常函数this会指向这个对象

   ```js
   var obj = {
     i: 10,
     b: () => console.log(this.i, this),
     c: function() {
       console.log( this.i, this)
     }
   }
   obj.b();
   // undefined, Window{...}
   obj.c();
   // 10, Object {...}
   ```

2. 通过call和apply调用

​	由于 箭头函数没有自己的this指针，通过 call() 或 apply() 方法调用一个函数时，只能传递参数（不能绑定this），他们的第一个参数会被忽略

3. 没有arguments
4. 没有prototype，所有不能new
5. 箭头函数不能当做Generator函数,不能使用yield关键字
6. 

# 解构

**1、遍历Map**

迭代器返回的是是一个个数组

```js
var map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
    console.log(key + " is " + value);
}

// 获取键名
for (let [key] of map) {
  // ...
}

// 获取键值
for (let [,value] of map) {
  // ...
}
```

# proxy 和 reflect

[ES6的Proxy和Reflect,你学会了吗？ - 掘金 (juejin.cn)](https://juejin.cn/post/7126352717458440200)

- `Proxy` 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（`meta programming`），即对编程语言进行编程。可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。

# Set 和 Map

1. Set

   `Set` 本身是一个构造函数，用来生成 `Set` 数据结构。`Set` 函数可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数，用来初始化。`Set` 对象允许你存储任何类型的值，无论是原始值或者是对象引用。它类似于数组，但是成员的值都是唯一的，没有重复的值。

   `Set` 对象存储的值总是唯一的，所以需要判断两个值是否恒等。有几个特殊值需要特殊对待：

   - +0 与 -0 在存储判断唯一性的时候是恒等的，所以不重复
   - `undefined` 与 `undefined` 是恒等的，所以不重复
   - `NaN` 与 `NaN` 是不恒等的，但是在 `Set` 中认为 `NaN` 与 `NaN` 相等，所有只能存在一个，不重复。

   **属性和方法：**

   ```js
   size：返回集合所包含元素的数量
   add(value)：添加某个值，返回 Set 结构本身(可以链式调用)。
   delete(value)：删除某个值，删除成功返回 true，否则返回 false。
   has(value)：返回一个布尔值，表示该值是否为 Set 的成员。
   clear()：清除所有成员，没有返回值。
   // 遍历的方法
   keys()：返回键名的遍历器。
   values()：返回键值的遍历器。
   entries()：返回键值对的遍历器。
   forEach()：使用回调函数遍历每个成员。
   ```

   **Set的应用**

   ```js
   数组去重
   ```

   实现并集、差集、交集

   ```js
   let a = new Set([1, 2, 3])
   let b = new Set([4, 3, 2])
   
   // 并集
   let union = new Set([...a, ...b])
   // Set {1, 2, 3, 4}
   
   // 交集
   let intersect = new Set([...a].filter((x) => b.has(x)))
   // set {2, 3}
   
   // 差集
   let difference = new Set([...a].filter((x) => !b.has(x)))
   // Set {1}
   ```

2.  **Map**

   `Map` 中存储的是 `key-value` 形式的键值对, 其中的 `key` 和 `value` 可以是任何类型的, 即对象也可以作为 `key`。 `Map` 的出现，就是让各种类型的值都可以当作键。`Map` 提供的是 “键-值”的对应。

   **Map和对象的区别**

   ```js
   Object 对象有原型， 也就是说他有默认的 key 值在对象上面， 除非我们使用 Object.create(null)创建一个没有原型的对象；
   在 Object 对象中， 只能把 String 和 Symbol 作为 key 值， 但是在 Map 中，key 值可以是任何基本类型(String, Number, Boolean, undefined, NaN….)，或者对象(Map, Set, Object, Function , Symbol , null….);
   通过 Map 中的 size 属性， 可以很方便地获取到 Map 长度， 要获取 Object 的长度， 你只能手动计算
   ```

   Map的属性和方法

   ```js
   set(key, val): 向 Map 中添加新元素
   get(key): 通过键值查找特定的数值并返回
   has(key): 判断 Map 对象中是否有 Key 所对应的值，有返回 true，否则返回 false
   delete(key): 通过键值从 Map 中移除对应的数据
   clear(): 将这个 Map 中的所有元素删除
   // 遍历方法
   keys()：返回键名的遍历器
   values()：返回键值的遍历器
   entries()：返回键值对的遍历器
   forEach()：使用回调函数遍历每个成员
   const map = new Map([
     ['a', 1],
     ['b', 2],
   ])
   
   for (let key of map.keys()) {
     console.log(key)
   }
   // "a"
   // "b"
   
   for (let value of map.values()) {
     console.log(value)
   }
   // 1
   // 2
   
   for (let item of map.entries()) {
     console.log(item)
   }
   // ["a", 1]
   // ["b", 2]
   
   // 或者
   for (let [key, value] of map.entries()) {
     console.log(key, value)
   }
   // "a" 1
   // "b" 2
   
   // for...of...遍历map等同于使用map.entries()
   
   for (let [key, value] of map) {
     console.log(key, value)
   }
   // "a" 1
   // "b" 2
   
   ```

   

   
