//结合原型继承和盗用构造函数继承
function superType() {
  this.name = 'zwf'
  this.hobby = ['sing', 'jump', 'rap']
}
superType.prototype.sayHello = function () {
  console.log('hello world')
}

function subType() {
  //通过盗用构造函数继承属性
  superType.call(this)
  this.age = 18
}
//通过原型继承方法
subType.prototype = new superType()

let s1 = new subType()
s1.sayHello()
console.log(s1)
