/***
 Created by IntelliJ IDEA.
 User: xiexy
 Date: 2019/5/14
 ***/

/**
 * 存储localStorage
 */
export const setLocalStore = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}

/**
 * 获取localStorage
 */
export const getLocalStore = (name) => {
  if (!name) return
  return window.localStorage.getItem(name)
}

/**
 * 存储sessionStorage
 */
export const setSessionStore = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.sessionStorage.setItem(name, content)
}

/**
 * 获取sessionStorage
 */
export const getSessionStore = (name) => {
  if (!name) return
  return window.sessionStorage.getItem(name)
}

/**
 * 删除localStorage
 */
export const removeStore = (name) => {
  if (!name) return
  window.localStorage.removeItem(name)
}

/**
 * 获取链接上拼接参数
 */
export const getUrlString = (str) => {
  let LocString = String(window.document.location.href)
  let rs = new RegExp('(^|)' + str + '=([^&]*)(&|$)', 'gi').exec(LocString),
    tmp
  if (tmp === rs) return decodeURI(tmp[2])
  return null
}

/**
 * 渠道设备
 */
export const browser = {
  versions: (function() {
    const u = navigator.userAgent
    return {
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
      wechat: u.toLowerCase().match(/MicroMessenger/i) == 'micromessenger', //微信浏览器
    }
  })(),
}

/**
 * 格式化数字
 */
export const formatNumber = (n) => {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

/**
 * 格式化日期
 */
export const formatTime = (date, type) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  // const hour = date.getHours();
  // const minute = date.getMinutes();
  // const second = date.getSeconds();

  const t1 = [year, month, day].map(formatNumber).join(type)
  // const t2 = [hour, minute, second].map(formatNumber).join(":");

  return `${t1}`
}

/**
 * 图片服务器地址
 */
export const BASE_IMG_URL = 'https://image.sxssmk.com/applets/'
