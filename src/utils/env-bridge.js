import dsBridge from 'dsbridge'
import wx from 'weixin-js-sdk'
import { getUrlString, setLocalStore } from './index'
import gcoord from 'gcoord'
import login_info from './login-info'

const name = 'TZSMK'
const envBridge = {
  _processEnv() {
    //环境判断
    return new Promise((resolve) => {
      const ua = navigator.userAgent.toLowerCase()
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        // ios的ua中无miniProgram，但都有MicroMessenger（表示是微信浏览器）
        wx.miniProgram.getEnv((res) => {
          if (res.miniprogram) {
            //小程序
            resolve('01')
          } else {
            //微信浏览器(公众号网页)
            resolve('02')
          }
        })
      } else {
        //外部浏览器（APP）| navigator.userAgent.indexOf('tzsmkapp') > -1
        resolve('03')
      }
    })
  },
  _getLoginName() {
    //获取登录名
    return new Promise((resolve, reject) => {
      this._processEnv().then((env) => {
        if (env === '03') {
          const login = JSON.parse(dsBridge.call(`${name}.getUserId`))
          if (login.login_name) {
            resolve({
              status: '0',
              login_name: login.login_name.toString(),
              ses_id: login.ses_id,
            })
          } else {
            reject({
              status: '-1',
              msg: 'get login name fail',
            })
          }
        } else {
          if (getUrlString('loginName')) {
            resolve({
              status: '0',
              login_name: decodeURIComponent(getUrlString('loginName')),
              ses_id: decodeURIComponent(getUrlString('sesId')),
            })
          } else {
            reject({
              status: '-1',
              msg: 'get login name fail',
            })
          }
        }
      })
    })
  },
  _getLocation() {
    //获取定位
    return new Promise((resolve, reject) => {
      this._processEnv().then((env) => {
        if (env === '03') {
          dsBridge.call(`${name}.getLocation`, (e) => {
            e = JSON.parse(e)
            if (e.result === '0') {
              resolve({
                status: '0',
                lng: e.longitude,
                lat: e.latitude,
              })
            } else {
              reject({
                status: '-1',
                msg: 'get location fail',
              })
            }
          })
        } else {
          wx.getLocation({
            type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: (res) => {
              const result = gcoord.transform(
                [res.longitude, res.latitude], // 经纬度坐标
                gcoord.GCJ02, // 当前坐标系
                gcoord.BD09 // 目标坐标系
              )
              resolve({
                status: '0',
                lng: result[0],
                lat: result[1],
              })
            },
            fail: () => {
              reject({
                status: '-1',
                msg: 'get location fail',
              })
            },
          })
        }
      })
    })
  },
  _chooseImage(option) {
    //调用相机或相册(type 0相册 1相机)
    const { type, number, count } = option
    let imgs = []
    return new Promise((resolve, reject) => {
      this._processEnv().then((env) => {
        if (env === '03') {
          dsBridge.call(
            `${name}.chooseImage`,
            JSON.stringify({
              number: type === '1' ? '1' : number - count,
              type: type,
            }),
            (e) => {
              const data = JSON.parse(e).data
              data.forEach((item, index) => {
                if (item.indexOf('data:image') < 0) {
                  //判断是否有这样的头部,安卓机上得到的是没有头部的base64码，且其中可能会包含换行符
                  item = 'data:image/jpeg;base64,' + item
                }
                imgs.push({
                  base64: item.split(',')[1],
                  suffix: 'jpeg',
                })
                if (index === data.length - 1) {
                  resolve({
                    status: '0',
                    imgs,
                  })
                }
              })
            }
          )
        } else {
          wx.chooseImage({
            count: type === '1' ? '1' : number - count,
            sizeType: ['original', 'compressed'],
            sourceType: type === '0' ? ['album'] : ['camera'],
            success: (res) => {
              res.localIds.forEach((item, index) => {
                wx.getLocalImgData({
                  localId: item,
                  success: (data) => {
                    let localData = data.localData // localData是图片的base64数据，可以用img标签显示
                    if (localData.indexOf('data:image') != 0) {
                      //判断是否有这样的头部,安卓机上得到的是没有头部的base64码，且其中可能会包含换行符
                      localData = 'data:image/jpeg;base64,' + localData
                    }
                    //第一个替换的是换行符，第二个替换的是图片类型，因为在IOS机上测试时看到它的图片类型时jgp
                    localData = localData
                      .replace(/\r|\n/g, '')
                      .replace('data:image/jgp', 'data:image/jpeg')
                    imgs.push({
                      base64: localData.split(',')[1],
                      suffix: 'jpeg',
                    })
                    if (index === res.localIds.length - 1) {
                      resolve({
                        status: '0',
                        imgs,
                      })
                    }
                  },
                })
              })
            },
            fail: () => {
              reject({
                status: '-1',
                msg: 'get images fail',
              })
            },
          })
        }
      })
    })
  },
  _makeCall(mobile) {
    //拨打电话
    this._processEnv().then((env) => {
      if (env === '03') {
        dsBridge.call(`${name}.callPhone`, { phone: mobile })
      } else {
        window.location.href = `tel://${mobile}`
      }
    })
  },
  _scanQRCode() {
    //扫一扫
    return new Promise((resolve, reject) => {
      this._processEnv().then((env) => {
        if (env === '03') {
          dsBridge.call(`${name}.ScanData`, (e) => {
            if (e.getresult === '0') {
              resolve({
                status: '0',
                result: e.resultStr,
              })
            } else {
              reject({
                status: '-1',
                msg: 'scan fail',
              })
            }
          })
        } else {
          wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
            success: (res) => {
              resolve({
                status: '0',
                result: res.resultStr, // 当needResult 为 1 时，扫码返回的结果
              })
            },
            fail: () => {
              reject({
                status: '-1',
                msg: 'scan fail',
              })
            },
          })
        }
      })
    })
  },
  _turnPage(option) {
    //页面(功能)跳转
    const { type, url, code } = option
    this._processEnv().then((env) => {
      if (env === '01') {
        switch (type) {
          case 'to':
            wx.miniProgram.navigateTo({ url })
            break
          case 'back':
            wx.miniProgram.navigateBack({ url })
            break
          case 'tab':
            wx.miniProgram.switchTab({ url })
            break
          case 'launch':
            wx.miniProgram.reLaunch({ url })
            break
          case 'redirect':
            wx.miniProgram.redirectTo({ url })
            break
        }
      } else if (env === '03') {
        if (code === 'exit') {
          dsBridge.call(`${name}.exitWebview`)
        } else {
          dsBridge.call(`${name}.NativeFuction`, JSON.stringify({ code }))
        }
      }
    })
  },
  _openLocation(option) {
    //打开地图导航
    const { location, name, address, scale } = option
    this._processEnv().then((env) => {
      if (env === '03') {
        dsBridge.call(
          `${name}.jumpMap`,
          JSON.stringify({
            location: location.lat + ',' + location.lng,
            title: name,
            content: address,
          })
        )
      } else {
        const result = gcoord.transform(
          [location.lng, location.lat], // 经纬度坐标
          gcoord.BD09, // 当前坐标系
          gcoord.GCJ02 // 目标坐标系
        )
        wx.openLocation({
          latitude: result[1], // 纬度，浮点数，范围为90 ~ -90
          longitude: result[0], // 经度，浮点数，范围为180 ~ -180。
          name: name, // 位置名
          address: address, // 地址详情说明
          scale: scale, // 地图缩放级别,整形值,范围从1~28。默认为最大
        })
      }
    })
  },
  _routerBefore(to, from, next) {
    let login = {}
    // 判断该页面是否需要登录信息
    if (to.meta.info) {
      if (process.env.NODE_ENV == 'development') {
        login = login_info
      } else {
        login = JSON.parse(dsBridge.call(`${name}.getLoginName`))
      }
      // 如果login存在直接跳转;
      if (login.user_id) {
        setLocalStore(
          'login',
          JSON.stringify({
            user_id: login.user_id.toString(),
            ses_id: login.ses_id,
          })
        )
        next()
      } else {
        dsBridge.call(
          `${name}.NativeFuction`,
          JSON.stringify({
            code: 'login',
          })
        )
      }
    } else {
      // 如果不需要登录，则直接跳转到对应页面
      next()
    }
  },
}

export default envBridge
