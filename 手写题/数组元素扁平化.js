let arr = [1, [2, [3, [4, 5]]]]
//方法一、递归
function flatten(arr) {
  let newArr = []
  for (val of arr) {
    if (Array.isArray(val)) {
      newArr = newArr.concat(flatten(val))
    } else {
      newArr.push(val)
    }
  }
  return newArr
}
//方法二 ToString()+split()+map()
function flatten2(arr) {
  let newArr = arr
    .toString()
    .split(',')
    .map((val) => {
      return parseInt(val)
    })
  return newArr
}

console.log(flatten2(arr))
