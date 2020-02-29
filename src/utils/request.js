import axios from 'axios'
import { message } from 'ant-design-vue'
// import store from '@/store'
// import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  // baseURL: '/api', // api的base_url
  timeout: 20000, // 请求超时时间
})

// 为Promise添加一些方法
Promise.prototype.finally = function finallyFn(callback) {
  const P = this.constructor
  return this.then(
    value => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason }),
  )
}
Promise.prototype.h_then = function then(success = () => { }, error = () => { }) {
  return this.then(data => success(data)).catch((err) => {
    console.log('err = ', err)
    return error(err)
  })
}

// request拦截器
// service.interceptors.request.use((config) => {
//   if (store.getters.token) {
//     config.headers.token = getToken()
//   }
//   return config
// })

// respone拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data
    if (res.code !== 200) {
      // 401:Token过期，失效等等;
      if (res.code === 401) {
        message.error('登录超时,请重新登录')
        // 清除token，刷新页面
        // store.dispatch('FedLogOut').then(() => {
        // window.location.reload()// 为了重新实例化vue-router对象 避免bug
        // })
      }
      return Promise.reject('error')
    }
    return res
  },
  (error) => {
    console.log(`err${error}`)// for debug
    message.error(error.message)
    return Promise.reject(error)
  },
)

export default service
// export const { get, post } = service
