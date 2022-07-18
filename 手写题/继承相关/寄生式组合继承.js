function parasiticExtends(subType, superType) {
  let prototype = Object.create(superType.prototype)
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
