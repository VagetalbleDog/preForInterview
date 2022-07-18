let request = function (url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`任务${url}完成`)
      resolve(200)
    }, 1000)
  })
    .then((code) => {
      console.log(`请求成功：状态码${code}`)
    })
    .catch((code) => {
      console.log(`请求失败：状态码${code}`)
    })
}

class ConcurrentPromise {
  request(url) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(`任务${url}完成`)
        resolve(200)
      }, 1000)
    })
      .then((code) => {
        console.log(`请求成功：状态码${code}`)
      })
      .catch((code) => {
        console.log(`请求失败：状态码${code}`)
      })
  }
  //并发池
  pool = []
  //最大并发量
  maxNum = 3
  //添加任务
  addTask(url) {
    if (this.pool.length < this.maxNum) {
      let task = request(url)
      this.pool.push(task)
      task.then(() => {
        //请求完成后出队
        this.pool.splice(this.pool.indexOf(task), 1)
      })
      return true
    } else {
      console.log('并发量限制 请等待 ')
      return false
    }
  }
}
let controller = new ConcurrentPromise()
let urls = [
  'bytedance.com',
  'tencent.com',
  'alibaba.com',
  'microsoft.com',
  'apple.com',
  'hulu.com',
  'amazon.com',
]
for (let i of urls) {
  if (controller.addTask(urls[i])) {
    urls.splice(i, 1)
  }
}
