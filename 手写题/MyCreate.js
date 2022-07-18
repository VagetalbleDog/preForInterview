Object.myCreate = function (object, properties) {
  if (!object) return

  function F() {}
  F.prototype = object
  if (properties) {
    Object.defineProperties(F, properties)
  }
  return new F()
}

let obj = {
  a: 1,
  b: 2,
}

obj2 = Object.myCreate(obj)

console.log(obj2)
