/****  request.js  ****/
import {ref} from "vue"
// 导入axios
import axios from "axios"
// 使用 ElMessage 做消息提示
import {ElMessage} from "element-plus"
// import {useStorage} from "../hooks/useStorage"

export const baseUrl = process.env.NODE_ENV === "development" ? "/infra/api" : "/api/"

// 1. 创建新的axios实例
const instance = axios.create({
  baseURL: baseUrl,
  // 超时时间 单位是ms，这里设置了60s的超时时间
  timeout: 60 * 1000
})

// 用于设置通用的报错提示语，使用：option增加errorMessageAlert字段
const errorMessageAlert = ref("")

// 2.请求拦截器
instance.interceptors.request.use(
  async (request) => {
    // 过期了刷新token
    const token = localStorage.token ? JSON.parse(localStorage.token) : {}
    request.headers = {
      Authorization: token.accessToken || "",
      "Content-Type": "application/json",
      ...request.headers,
    } as any;
    return request
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 3.响应拦截器
instance.interceptors.response.use(
  (response) => {
    const {code} = response.data
    if (code === 401) {
      // token过期了
      if (window.location.href !== window.location.origin + "/#/login") {
        localStorage.removeItem("token")
        window.location.href = window.location.origin + "/#/login"
        window.location.reload()
      }
      return
    }
    if (response.data instanceof Blob) {
      return response.data
    }
    if (code === 404) {
      // 数据不存在,需要错误信息
      return response.data
    }
    if (code !== 200) {
      return Promise.reject(response.data.message)
    }
    return response.data
  },
  (error) => {
    const {status, data} = error?.response
    if (status === 503 && !window.location.href.includes("/error")) {
      window.location.href = window.location.origin + "/#/error"
      window.location.reload()
    }
    if (error) {
      // 1.公共错误处理
      // 2.根据响应码具体处理
      switch (status) {
        case -1:
          error.message = `${data.message}`
          break
        case 400:
          error.message = "错误请求"
          break
        case 401:
          error.message = "未授权，请重新登录"
          break
        case 403:
          error.message = "拒绝访问"
          break
        case 404:
          error.message = "请求错误,未找到该资源"
          break
        case 405:
          error.message = "请求方法未允许"
          break
        case 408:
          error.message = "请求超时"
          break
        case 500:
          error.message = `${data.message}`
          break
        case 501:
          error.message = "网络未实现"
          break
        case 502:
          error.message = "网络错误"
          break
        case 503:
          error.message = "系统维护中,请稍后重试哦！"
          break
        case 504:
          error.message = "网络超时"
          break
        case 505:
          error.message = "http版本不支持该请求"
          break
        default:
          error.message = `连接错误${status}`
      }
    } else {
      // 超时处理
      if (JSON.stringify(error).includes("timeout")) {
        ElMessage.error("服务器响应超时，请刷新当前页")
      }
      error.message = "连接服务器失败"
    }
    // 登录界面不做任何报错提示(产品说的)
    if (window.location.href.split("?")[0] !== window.location.origin + "/#/login") {
      errorMessageAlert.value ? ElMessage.error(errorMessageAlert.value) : ElMessage.error(error.message)
    }
    console.log(error, "error-axios")
    return Promise.reject(error)
  }
)

const request = (url: string, options: any = {}) => {
  // 请求方法统一转换成小写
  if (options.method && /[a-z]+/i.test(options.method)) {
    options.method = options.method.toLowerCase()
  }

  // 统一过滤掉 randomUuid
  delete options?.data?.randomUuid
  delete options?.param?.randomUuid
  delete options?.params?.randomUuid

  // 提示语
  errorMessageAlert.value = options.errorMessageAlert ?? ""

  if (options.method === "get") {
    return instance.request({
      url: url,
      ...options,
      params: {...options.data, ...options.param, ...options.params}
    })
  }

  return instance.request({
    url: url,
    ...options
  })
}

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url: string, params: any) {
  return new Promise((resolve, reject) => {
    instance
      .get(url, {
        params: params
      })
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err.data)
      })
  })
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url: string, params: any) {
  return new Promise((resolve, reject) => {
    instance
      .post(url, params)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err.data)
      })
  })
}

export default request
