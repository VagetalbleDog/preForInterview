//方法1、使用Json的stringify和parse方法
function deepClone_JsonType(obj) {
  let temp = JSON.stringify(obj)
  return JSON.parse(temp)
}

function deepCopy(obj) {
  if (!obj || typeof obj !== 'object') {
    throw new TypeError(`${obj} is not a object`)
  }
  let map = new Map()
  function deep(obj, map) {
    if (map.get(obj)) {
      return map.get(obj)
    }
    let newObj = Array.isArray(obj) ? [] : {}
    map.set(obj, newObj)
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === 'object') {
          newObj[key] = deep(obj[key], map)
        } else {
          newObj[key] = obj[key]
        }
      }
    }
    return newObj
  }
  return deep(obj, map)
}
//测试
let obj1 = {
  a: 1,
  b: { c: 2 },
  d: [1, 2, 3, { e: { f: 5 } }],
}
let obj2 = deepCopy(obj1)
console.log(obj2)
console.log(obj1.d[3].e.f)
