class superType {
  constructor(name) {
    this.name = name
  }
  sayHello() {
    console.log('hello')
  }
}
class subType extends superType {
  constructor(name, age) {
    super(name)
    this.age = age
  }
}

let p1 = new subType('zwf', 19)
p1.sayHello()
