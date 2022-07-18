function superType() {
  this.name = 'zwf'
  this.hobby = ['sing', 'jump', 'rap']
}
superType.prototype.sayHello = () => {
  console.log('hello world')
}
function subType() {
  superType.call(this)
  this.age = 18
}

let s1 = new subType()
let s2 = new subType()
s1.hobby.push('play')
console.log(s1.hobby)
console.log(s2.hobby)
//盗用构造函数继承的缺点 就是不能访问父类构造函数上的方法
s2.sayHello() //s2.sayHello is not a function
