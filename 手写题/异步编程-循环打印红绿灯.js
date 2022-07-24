
function red() {
  console.log('red')
}
function green() {
  console.log('green')
}
function yellow() {
  console.log('yellow')
}

//用callback实现,不断的回调
const callbackTask = (timer, light, callback) => {
  setTimeout(() => {
    switch (light) {
      case 'red':
        red();
        break;
      case 'yellow':
        yellow();
        break;
      case 'green':
        green();
        break
    }
    callback();
  }, timer)
}
const doCallBack = () => {
  callbackTask(1000, 'green', () => { callbackTask(2000, 'yellow', () => { callbackTask(3000, 'red', doCallBack) }) })
}

const taskPromise = (timer,light)=>{
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      switch (light) {
        case 'red':
          red();
          break;
        case 'yellow':
          yellow();
          break;
        case 'green':
          green();
          break
      }
      resolve()
    },timer)
  })
}
const doPromise = ()=>{
  taskPromise(1000,'green').then(()=>{
    taskPromise(2000,'yellow').then(()=>{
      taskPromise(3000,'red').then(doPromise)
    })
  })
}

//用async/await实现
const lighter = function (timer, light) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (light === 'red') {
        red()
      } else if (light === 'green') {
        green()
      } else if (light === 'yellow') {
        yellow()
      }
      resolve()
    }, timer)
  })
}
const asyncTask = async () => {
  await lighter(3000, 'red')
  await lighter(2000, 'yellow')
  await lighter(1000, 'green')
  asyncTask()
}
