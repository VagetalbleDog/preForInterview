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
const taskCallback = function (timer, light, callback) {
  setTimeout(() => {
    if (light === 'red') {
      red()
    } else if (light === 'yellow') {
      yellow()
    } else if (light === 'green') {
      green()
    }
    callback()
  }, timer)
}

const stepCallback = function () {
  taskCallback(3000, 'red', () => {
    taskCallback(2000, 'yellow', () => {
      taskCallback(1000, 'green', () => {
        stepCallback()
      })
    })
  })
}

//用promise实现
const taskPromise = function (timer, light) {
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

const stepPromise = function () {
  taskPromise(3000, 'red').then(() => {
    taskPromise(2000, 'yellow').then(() => {
      taskPromise(1000, 'green').then(stepCallback)
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
asyncTask()
