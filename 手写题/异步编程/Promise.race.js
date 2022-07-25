//想想promise.race（）的作用是啥，接受一个可迭代对象作为参数，一般是数组,里边的三个promise竞速，谁先改变状态，race函数就改变谁的状态
function promiseRace(promises){
  if(!promises[Symbol.iterator]){
    throw new TypeError(`${promises}不可迭代`)
  }
  return new Promise((resolve,reject)=>{
    for(let promise of promises){
      promise.then(resolve,reject)
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
    reject(2)
  }, 1000)
})
let p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(3)
  }, 3000)
})
promiseRace([p1, p2, p3])
  .then((val) => {
    console.log(val)
  })
  .catch((reason) => {
    console.log(reason)
  })
