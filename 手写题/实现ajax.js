const xhr = new XMLHttpRequest()
const server_url = '/server'

xhr.open('GET', server_url)

xhr.onreadystatechange = function () {
  if (xhr.readyState !== 4) {
    return
  }
  if (xhr.status >= 200 && xhr.status < 400) {
    console.log(xhr.response)
  } else {
    console.error(this.statusText)
  }
}
xhr.responseType = 'json'
xhr.setRequestHeader('Accept', 'application/json')
xhr.send()
