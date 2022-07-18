//主要配合type of
function getType(value) {
  if (value === null) {
    return value + '' //保证输出类型为string
  }
  //是基本数据类型的情况
  if (typeof value !== 'object') {
    return typeof value
  }
  let valueClass = Object.prototype.toString.call(value)
  let type = valueClass.split(' ')[1].split('')
  type.pop()
  return type.join('')
}

//测试
let p1 = new Promise(() => {})
let d1 = new Date()
console.log(getType(p1))
console.log(getType(d1))
