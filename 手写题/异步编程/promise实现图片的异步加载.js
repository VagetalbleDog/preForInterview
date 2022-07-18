let imageAsync = (url) => {
  return new Promise((resolve, reject) => {
    let img = new Image()
    img.src = url
    img.onload = function () {
      console.log('图片加载成功')
      resolve(img)
    }
    img.onerror = function () {
      console.error('图片加载失败')
      reject(err)
    }
  })
}

imageAsync(url)
  .then((img) => {})
  .catch((err) => {})
