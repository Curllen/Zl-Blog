import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 封装axios框架,使用axios的实例对象进行操作
export function request(config) {
  const INSTANCE = axios.create({
    baseURL: 'http://www.lwjppz.cn/zl/',
    timeout: 10000
  })

  INSTANCE.defaults.headers = {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
  }

  INSTANCE.interceptors.request.use(config => {
    NProgress.start()
    // config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
  })

  INSTANCE.interceptors.response.use(res => {
    NProgress.done()
    return res.data
  }, err => {
    console.log(err);
  })

  return INSTANCE(config)
}
