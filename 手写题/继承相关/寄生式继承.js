//类似于工厂模式+原型继承
function ParasiticExtends(obj) {
  //创建对象
  let newObj = Object.create(obj)
  //加强对象
  newObj.sayHi = function () {
    console.log('Hello world')
  }
  //返回对象
  return newObj
}

let person = {
  name: 'zwf',
  age: 19,
}
let clonePerson = ParasiticExtends(person)
clonePerson.sayHi()
console.log(clonePerson.name)
