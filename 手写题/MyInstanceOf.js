function myInstanceOf(left, right) {
  if (!left) {
    return false
  }
  let proto = left.__proto__
  let prototype = right.prototype
  while (proto) {
    if (proto === prototype) {
      return true
    }
    proto = proto.__proto__
  }
  return false
}
