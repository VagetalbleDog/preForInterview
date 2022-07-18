class myStorage {
  constructor(name) {
    this.name = name
    //timer作为一个哈希表 用来存放键名以及其对应的有效时间
    this.timer = new Map()
  }

  setItem(key, value, time) {
    if (typeof key !== 'string') {
      throw new Error('不合法的键名!')
    }
    if (typeof value !== 'string') {
      throw new Error('value的值只能设置为字符串')
    }
    if (typeof time !== 'number') {
      throw new Error('time的值必须为number类型，且以ms为单位')
    }
    const storage = localStorage
    let timeCounter = {
      startTime: new Date(),
      persistentTime: time,
    }
    storage.setItem(key, value)
    this.timer.set(key, timeCounter)
  }

  getItem(key) {
    if (typeof key !== 'string') {
      throw new Error('不合法的键名!')
    }
    if (!this.timer.has(key)) {
      return undefined
    }
    let now = new Date()
    if (
      now - this.timer.get(key).startTime >
      this.timer.get(key).persistentTime
    ) {
      //判断是否过期，如果过期的话，我们还要将其从storage和timer哈希表中移除
      localStorage.removeItem(key)
      this.timer.delete(key)
      return '你所访问的key已经过期了'
    }
    return localStorage.getItem(key)
  }

  removeItem(key) {
    if (typeof key !== 'string' || !this.timer.has(key)) {
      throw new Error('不合法的键名!或者您访问的键名不存在或已过期')
    }
    let now = new Date()
    if (
      now - this.timer.get(key).startTime >
      this.timer.get(key).persistentTime
    ) {
      localStorage.removeItem(key)
      return '你所访问的key已经过期了，已经删除掉了'
    }
    return localStorage.removeItem(key)
  }

  clear() {
    localStorage.clear()
    this.timer.clear()
  }
}
