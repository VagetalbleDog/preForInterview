// const { promisify } = require('util')
//promisify将NodeCallBack转换为promise
//nodeCallback函数的两个条件，条件一：回调函数作为主函数参数的最后一个，回调函数的第一个参数是err
function promisify(fn) {
  //接受一个函数作为参数，将其转换为promise
  return function (...args) {
    return new Promise((resolve, reject) => {
      args.push(function (err, ...data) {
        if (err) {
          reject(err)
        } else {
          resolve(...data)
        }
      })
      fn.apply(null, args)
    })
  }
}
const fs = require('fs')
let readFileAsync = promisify(fs.readFile)
readFileAsync('./TEST.js').then(
  (data) => {
    console.log(data)
  },
  (err) => {
    console.log(err)
  }
)
