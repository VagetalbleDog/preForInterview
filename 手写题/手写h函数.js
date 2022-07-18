function vNode(sel, data, children, text, elm) {
  return { sel, data, children, text, elm }
}

//形态1：h('div',{},文本内容)
//形态2：h('div',{},[])
//形态3：h('div',{},h())
function h(sel, data, c) {
  if (arguments.length !== 3) {
    throw new Error('必须传入三个参数')
  }
  if (typeof c === 'string' || typeof c === 'number') {
    //形态一
    return vNode(sel, data, undefined, c, undefined)
  }
  //形态二
  if (Array.isArray(c)) {
    let children = []
    for (let i = 0; i < c.length; i++) {
      if (typeof c[i] !== 'object' || !c[i].hasOwnProperty('sel')) {
        throw new TypeError()
      }
      children.push(c[i])
    }
    return vNode(sel, data, children, undefined, undefined)
  }
  //形态三
  if (typeof c === 'object' && c.hasOwnProperty('sel')) {
    //传入的c就是唯一的children
    let children = []
    children.push(c)
    return vNode(sel, data, children, undefined, undefined)
  }
}

console.log(h('div', {}, 'hahahaha'))
