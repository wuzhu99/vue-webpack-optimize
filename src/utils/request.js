/***
 Created by IntelliJ IDEA.
 User: xiexy
 Date: 2019/5/9
 ***/
import dsBridge from 'dsbridge'
import axios from 'axios'
import { Toast, Dialog } from 'vant'
import { commInHandle } from '../utils/cryptography'
import { removeStore } from './index'

const request = axios.create({
  timeout: 1000 * 15,
  withCredentials: false, //是否携带cookie信息
  headers: {
    'Content-Type': 'text/plain; charset=utf-8',
  },
  baseURL:
    process.env.NODE_ENV === 'development'
      ? '/proxyApi/interf/frontEnd'
      : process.env.VUE_APP_BASE_URL + '/interf/frontEnd',
})

/**
 * 请求拦截
 */
request.interceptors.request.use(
  (config) => {
    Toast.loading({ message: '加载中...', duration: 0 })
    return {
      ...config,
      data: request.postData(config.data, config.data.type || 0),
    }
  },
  (error) => {
    return Promise.reject(error)
  }
)

/**
 * 响应拦截
 */
request.interceptors.response.use(
  (response) => {
    Toast.clear()
    if (response.data.result == '100020' || response.data.result == '999996') {
      //抢登
      Dialog.alert({
        title: '温馨提示',
        message: response.data.msg,
      }).then(() => {
        removeStore('login')
        dsBridge.call('TZSMK.NativeFuction', JSON.stringify({ code: 'login' }))
      })
    } else {
      return response.data
    }
  },
  (error) => {
    switch (error.response.status) {
      case 400:
        Toast.fail(error.response.data)
        break
      case 405:
        Toast.fail('http请求方式有误')
        break
      case 500:
        Toast.fail('服务器出了点小差，请稍后再试')
        break
      case 501:
        Toast.fail('服务器不支持当前请求所需要的某个功能')
        break
    }
    return Promise.reject(error)
  }
)

/**
 * post请求数据处理
 * @param {*} data 数据对象
 * @param {*} type 处理方式0软算法1江南科友
 */
request.postData = (data = {}, type = 0) => {
  if (type == 1) {
    data = commInHandle.sign(data)
  } else {
    data = commInHandle.sign(commInHandle.encrypt(data))
  }
  return JSON.stringify(data)
}

export default request
