// 主要用到object.create()
Object.prototype.myCreate = function (obj) {
  if (typeof obj !== 'object') {
    throw new TypeError('你需要传入一个对象作为参数')
  }
  function F() {}
  F.prototype = obj
  return new F()
}
//上面这个是自己实现的Object.create()
let person = {
  name: 'zwf',
  age: '18',
  hobby: 'sing',
}
let p2 = Object.create(person)
console.log(p2.name)
