import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types/index'
import xhr from './xhr'
import { buildURL } from './helpers/url'
import { transformRequest, transformResponse } from './helpers/data'
import { processHeader } from './helpers/header'
function axios(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    //拿到响应数据
    return transformResponseData(res)
  })
}

// 发送请求对config参数进行处理
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

// 处理url
function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}

// 处理data数据
function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

// 处理header参数
function transformHeaders(config: AxiosRequestConfig): any {
  // 即使我们没有传递headers参数,我们也希望能够处理
  const { headers = {}, data } = config
  return processHeader(headers, data)
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  // 处理一下再原样返回
  res.data = transformResponse(res.data)
  return res
}
export default axios
