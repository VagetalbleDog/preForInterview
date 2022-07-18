let url =
  'https://cn.bing.com/search?q=%E6%9C%B1%E6%96%87%E7%94%AB&cvid=ce3f6d6416824d05a2886fb05315fa94&aqs=edge..69i57j69i61l3.6620j0j4&FORM=ANAB01&PC=U531'
function UrlParamsToObj(url) {
  if (typeof url !== 'string') {
    throw new TypeError('url need to be a str!')
  }
  let newObj = {}
  let queryStrIndex = url.indexOf('?')
  url = url.slice(queryStrIndex + 1)
  let paramsArr = url.split('&')
  for (let val of paramsArr) {
    let tempArr = val.split('=')
    newObj[tempArr[0]] = tempArr[1]
  }
  return newObj
}
console.log(UrlParamsToObj(url))
