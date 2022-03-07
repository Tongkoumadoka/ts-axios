// 所有公共项目类型定义文件
export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'haed'
  | 'HAED'
  | 'options'
  | 'OPTIONS'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'
  | 'post'
  | 'POST'

// axios配置项的
export interface AxiosRequestConfig {
  url: string
  method?: Method
  data?: any
  params?: any
  // 新增headers满足请求头的修改
  headers?: any
  // 设置响应的数据类型
  responseType?: XMLHttpRequestResponseType
  // 设置请求超时时间,判断是否超时报错
  timeout?: number
}

// method使用字符串字面量

// 返回response
export interface AxiosResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

export interface AxiosPromise extends Promise<AxiosResponse> {}
