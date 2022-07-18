function debounce(fn, wait) {
  let timeout = null
  return () => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn()
    }, wait)
  }
}

function throttle(fn, wait) {
  let timeout = null
  return () => {
    if (timeout) {
      return
    }
    timeout = setTimeout(() => {
      fn()
      timeout = null
    }, wait)
  }
}
function hello() {
  console.log('hello world')
}
