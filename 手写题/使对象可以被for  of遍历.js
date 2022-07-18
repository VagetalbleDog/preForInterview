let obj = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  s: 'hello world',
  [Symbol.iterator]: function* () {
    //生成器对象作为可迭代对象
    for (key in obj) {
      yield obj[key]
    }
  },
}
for (val of obj) {
  console.log(val)
}
