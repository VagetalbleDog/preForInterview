//先简单体验下Promise.allSettled的用法和作用

// Promise.allSettled([p1, p2]) //返回一个promise对象，这个promise对象不会有reject的情况，他会resolve一个数组，数组里包含了参数中所有promise对象的执行结果(Object)
//   .then((val) => {
//     console.log(val)
//   })

function myPromiseSettled(promises) {
  if (!promises[Symbol.iterator]) {
    throw new TypeError('你传入的参数不可迭代')
  }
  return new Promise((resolve) => {
    let settledCounts = 0
    let promisesNumber = promises.length
    let settled = []
    for (let i = 0; i < promisesNumber; i++) {
      promises[i]
        .then((val) => {
          settledCounts++
          let temp = {}
          temp.status = 'fulfilled'
          temp.value = val
          settled.push(temp)
          if (settledCounts === promisesNumber) {
            resolve(settled)
          }
        })
        .catch((reason) => {
          settledCounts++
          let temp = {}
          temp.status = 'rejected'
          temp.reason = reason
          settled.push(temp)
          if (settledCounts === promisesNumber) {
            resolve(settled)
          }
        })
    }
  })
}

let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p1')
  }, 1000)
})

let p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('p2')
  }, 2000)
})

myPromiseSettled([p1, p2]).then((val) => {
  console.log(val)
})
