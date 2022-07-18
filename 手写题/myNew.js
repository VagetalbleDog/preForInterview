// 首先要搞清楚new发生了哪些事情。
// 1、首先是创建一个新的空对象
// 2、设置原型，将对象的原型设置为函数的prototype
// 3、将函数的this指向这个对象，执行构造函数的代码
// 4、判断函数的返回值情况，返回引用类型，则New返回引用类型，返回值类型（1）则返回生成的新对象obj

function myNew(Fn, ...rest) {
  let newObj = {}
  newObj.__proto__ = Fn.prototype
  let res = Fn.call(newObj, ...rest)
  if (typeof res === 'object') {
    return res
  } else {
    return newObj
  }
}

// 测试
function foo() {
  this.name = 'zwf'
  this.arg = arguments[0]
}
foo.prototype.callName = function () {
  console.log(this.name)
}

let test = myNew(foo, 'messi', '123', 'dada1')
test.callName()
console.log(test.arg)
