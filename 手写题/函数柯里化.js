//柯里化是将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术
//柯里化的用途 参数复用
function curry(fn) {
  if (typeof fn !== 'function') {
    throw new TypeError()
  }
  //用于保存参数
  const args = []
  return function result(...rest) {
    if (rest.length === 0) {
      return fn(...args)
    } else {
      args.push(...rest)
      return result
    }
  }
}

function sum(...args) {
  return args.reduce((x1, x2) => {
    return x1 + x2
  })
}
// console.log(curry(sum, 1)(2, 3))
let curry_sum = curry(sum)
console.log(curry_sum(1)(2, 3, 4)(5)())
