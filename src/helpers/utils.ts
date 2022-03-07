const toString = Object.prototype.toString
// 判断类型的方法!!
export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

// 判断是否为普通对象的方法
// 普通对象 [object Object]

// 特殊对象就像Date [object Date]
// 当value === null typeof 还是true
export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}
