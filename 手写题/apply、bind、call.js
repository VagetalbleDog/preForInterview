//体会一下call、apply、bind的区别,call和apply都是立即执行 返回执行结果 然后apply的参数列表 后面得是一个可迭代对象 一般是数组
//bind的话 是返回一个待执行的函数 并且支持柯里化传参
Function.prototype.myApply = (context=window,args)=>{
  context.newFn = this;
  const res = context.newFn(...args)
  delete context.newFn;
  return res;
}

Function.prototype.myCall = function (context, ...rest) {
  if (typeof this !== 'function') {
    throw new TypeError(`${typeof this}类型不能调用myCall方法`)
  }
  if (!context) {
    context === window
  }
  context.newFn = this
  let res = context.newFn(...rest)
  delete context.newFn
  return res
}

Function.prototype.myBind = function (context = window, ...rest) {
  // if (typeof this !== 'function') {
  //   throw new TypeError(`${typeof this}类型不能调用myBind方法`)
  // }
  let self = this
  return function (...rest2) {
    let args = rest.concat(rest2)
    return self.apply(context, args)
  }
}

//用于测试
let person = {
  name: 'tom',
  say(age, hobby) {
    console.log(this)
    console.log(`我叫${this.name},我今年 ${age}，我爱${hobby}`)
  },
}

let Person1 = {
  name: 'nihao',
}

let fn = person.say.myBind(Person1, 18)('meinv')
