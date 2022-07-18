//原型继承
function superType() {
  this.name = 'zwf'
  this.arr = []
}
function subType() {
  this.age = 18
}

subType.prototype = new superType()

let newSubType1 = new subType()
let newSubType2 = new subType()
//这两行代码演示了原型继承所存在的一些问题
newSubType1.arr.push(1, 2)
console.log(newSubType2.arr)
