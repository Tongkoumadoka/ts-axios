// 判断是否为普通对象再转换为json

//
import { isPlainObject } from './utils'
export function transformRequest(data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  // 特殊对象就不做处理
  return data
}

// 对服务器的响应数据进行处理
export function transformResponse(data: any): any {
  if (typeof data === 'string') {
    // 也就是尝试对data解析,不行就原样输出
    try {
      data = JSON.parse(data)
    } catch (e) {
      //do nothing
    }
  }
  return data
}
