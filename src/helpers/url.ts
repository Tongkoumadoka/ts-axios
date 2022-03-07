import { isDate, isPlainObject } from './utils' // 注意使用相对路径
function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
  // 将特殊字符进行处理
}

export function buildURL(url: string, params?: any): string {
  if (!params) {
    return url
  }
  // 拼接字符串
  const parts: string[] = []
  Object.keys(params).forEach(key => {
    const val = params[key]
    // 判断非空
    if (val === null || typeof val === 'undefined') {
      return
    }
    let values = []
    // 判断key对应的value是否为数组
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      // 规范成数组形式
      values = [val]
    }
    //对values进行类型判断
    values.forEach(val => {
      if (isDate(val)) {
        // 日期化
        val = val.toISOString()
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val)
      }
      // 对一些字符的转义进行解码
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })
  let serializedParams = parts.join('&')
  if (serializedParams) {
    // 判断是否有哈希值 #开头
    const marIndex = url.indexOf('#')
    if (marIndex !== -1) {
      url = url.slice(0, marIndex) // 切除
    }
    // 拼接还得判断url如果有参数
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }
  return url
}
// 文件导出多个函数或者内容时,就不需要加default
