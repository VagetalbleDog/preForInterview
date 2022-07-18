//先回顾一下promise.all()是干啥的,他接受的参数是一个含有多个promise实例的可迭代对象，

//当数组中的所有promise实例均变成resolved状态后，返回一个resolved状态的promise对象，否则返回一个rejected状态的promise对象
function promiseAll(promises) {
  if (!promises[Symbol.iterator]) {
    throw new TypeError('你传入的参数不可迭代')
  }
  return new Promise((resolve, reject) => {
    let promisesNumber = promises.length
    let resolvedCounts = 0
    let resolveArr = []
    for (let i = 0; i < promisesNumber; i++) {
      promises[i]
        .then((val) => {
          resolveArr.push(val)
          resolvedCounts++
          if (resolvedCounts === promisesNumber) {
            resolve(resolveArr)
          }
        })
        .catch((reason) => {
          reject(reason)
        })
    }
  })
}
//测试
let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1)
  }, 3000)
})
let p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(2)
  }, 2000)
})
let p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(3)
  }, 1000)
})
promiseAll([p1, p2, p3])
  .then((res) => {
    console.log(res)
  })
  .catch((reason) => {
    console.log(reason)
  })
