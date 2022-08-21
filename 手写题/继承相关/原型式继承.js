// 主要用到object.create()
Object.prototype.myCreate = function(obj){
  function F() {};
  F.prototype = obj;
  return new F()
}
//上面这个是自己实现的Object.create()
let person = {
  name: 'zwf',
  age: '18',
  hobby: ['sing','jump']
}
let p2 = Object.myCreate(person)
console.log(p2.name)
person.hobby.push(1)
console.log(person)