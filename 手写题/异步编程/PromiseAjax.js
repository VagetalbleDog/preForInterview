function AsyncRequestJson(url, methods) {
  if (methods !== 'GET' || methods !== 'POST') {
    throw new Error('Invalid method!')
  }
  let promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open(methods, url)
    xhr.setRequestHeader('Accept', 'application/json')
    xhr.responseType = 'json'
    xhr.onreadystatechange = function () {
      if (this.readyState !== 4) {
        return
      }
      if (this.status >= 200 && this.status < 400) {
        resolve(this.response)
      } else {
        reject(this.statusText)
      }
    }
  })
  promise
    .then((response) => {
      console.log(response.data)
    })
    .catch((reason) => {
      console.log(reason)
    })
}
