import { config } from 'process'
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types/index'
import { parseHearders } from './helpers/header'
import { rejects } from 'assert'
// 功能模块拆分

// 返回一个PROMISE
export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers, responseType, timeout } = config
    const request = new XMLHttpRequest()

    // 赋值请求类型
    if (responseType) {
      // 设置就赋值
      request.responseType = responseType
    }
    // 赋值超时时间
    if (timeout) {
      request.timeout = timeout
    }
    request.open(method.toUpperCase(), url, true)

    // 设置onreadystatechange=>成功时
    request.onreadystatechange = function handleload() {
      if (request.readyState !== 4) {
        // ajax 请求的状态码
        return
      }

      // 网络错误或者超时错误
      if (request.status === 0) {
        return
      }

      // 获取所有数据头,并解析成对象形式
      const responseHeaders = parseHearders(request.getAllResponseHeaders())
      const responseData = responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }

      // 将处理后的response发送出去
      handleResponse(response)
    }

    // 处理错误 1:网络错误
    request.onerror = function handleError() {
      reject(new Error('NETWORK ERROr'))
    }

    // 处理错误 2.超时错误
    request.ontimeout = function handleTimeout() {
      reject(new Error(`TIMEOUT OF ${timeout}MS EXCEEDED`))
    }

    // 处理错误 3.处理非200 状态码

    // 实际xhr增加headers
    Object.keys(headers).forEach(name => {
      if (data === null && name.toLocaleLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })
    request.send(data)

    // 辅助函数,处理响应的状态码
    function handleResponse(response: AxiosResponse): void {
      if (response.status >= 200 && response.status <= 300) {
        resolve(response)
      } else {
        reject(new Error(`REQUEST FAILED WITH STATUS CODE ${response.status}`))
      }
    }
  })
}
