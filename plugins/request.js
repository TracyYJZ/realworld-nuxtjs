import axios from 'axios'

export const request = axios.create({
  baseURL: 'https://conduit.productionready.io/api',
})

// 通过插件机制获取到上下文对象（query、params、req、res、app、store...）
// 插件导出函数必须作为 default 成员
export default ({ store }) => {
  // 添加请求拦截器
  request.interceptors.request.use(
    function(config) {
      // 在发送请求之前做些什么
      // 统一为所有请求头添加身份信息
      const { user } = store.state
      if (user && user.token) {
        config.headers.Authorization = `Token ${user.token}`
      }
      return config
    },
    function(error) {
      // 对请求错误做些什么
      return Promise.reject(error)
    }
  )
}
