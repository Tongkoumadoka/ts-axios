import { isPlainObject } from './utils'

// 对header-name规范化,因为可能大写也可能小写
function normalizeHeaderName(headers: any, normalizeName: string): void {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(name => {
    // 本身不相等,但是全大写后相等
    if (name !== normalizeName && name.toUpperCase() === normalizeName.toUpperCase()) {
      headers[normalizeName] = headers[name] //
      delete headers[name] // 删除小写的
    }
  })
}

export function processHeader(headers: any, data: any): any {
  // data判断是否为普通对象,如果是才进行json处理,header才需要修改

  // 将小写的content-type转换为我们需要的首字母大写形式
  normalizeHeaderName(headers, 'Content-Type')

  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }

  return headers
}

//
export function parseHearders(headers: string): any {
  let parsed = Object.create(null)
  if (!headers) {
    return parsed
  }
  // 获得每一段的字符串数组
  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')
    // 删除空格/全小写
    key = key.trim().toLowerCase()
    // 空字符串,调到下次循环
    if (!key) {
      return
    }
    if (val) {
      val = val.trim()
    }
    parsed[key] = val
  })
  return parsed
}
