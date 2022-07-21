# 常见请求字段

## host字段
客户端发送请求时，用于指定服务器的域名

## connection字段
最常用于客户端要求服务器使用TCP持久连接，以便其他请求复用

## Accept
浏览器能够处理的内容类型

## referer
发出请求的页面的url

# 常见响应字段

## Content-length
服务器返回数据时，表面本次回应的数据长度

## Content-type
服务器回应时，告诉客户端此次返回的数据格式

## Content-Encoding
服务器回应时，告诉客户端此次用了什么压缩格式

## cache-control（1.1）、expire（1.0）
控制强缓存

## etag（1.1）、lastModified（1.0）
控制协商缓存
