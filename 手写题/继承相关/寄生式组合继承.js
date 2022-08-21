//通过盗用构造函数继承属性，通过寄生式继承保持原型链和方法
function parasiticExtends(subType, superType) {
  //获得父类原型的浅复制
  let prototype = Object.create(superType.prototype)
  //弥补因为重写原型而丢失的constructor
  prototype.constructor = subType.prototype
  subType.prototype = prototype
}

function superType(name) {
  this.name = name
  this.hobby = ['sing', 'jump', 'rap']
}
superType.prototype.sayHi = function () {
  console.log('hello world')
}
function subType(name, age) {
  this.age = age
  superType.call(this, name)
}

parasiticExtends(subType, superType)

let p1 = new subType('zwf', 18)
console.log(p1.__proto__ === subType.prototype)
