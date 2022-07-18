class EventCenter {
  //定义事件容器，用来装事件数组
  constructor() {
    this.handlers = {}
  }

  addEventListener(type, handler) {
    if (!this.handlers[type]) {
      this.handlers[type] = []
    }
    //存入事件
    this.handlers[type].push(handler)
  }

  dispatchEvent(type, params) {
    if (!this.handlers[type]) {
      return new Error('该事件未注册')
    }
    this.handlers[type].forEach((handler) => {
      handler(...params)
    })
  }

  removeEvent(type, handler) {
    if (!this.handlers[type]) {
      throw new TypeError('该事件未注册')
    }
    if (!handler) {
      delete this.handlers[type]
    } else {
      let index = this.handlers[type].findIndex((val) => {
        return val === handler
      })
      this.handlers[type].splice(index, 1)
      if (this.handlers[type].length === 0) {
        delete this.handlers[type]
      }
    }
  }
}
