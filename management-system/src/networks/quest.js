// 数据请求的封装

import axios from 'axios/index'
import qs from 'qs'

import options from './options'

// 域名地址
// axios.defaults.baseURL = options.loginURL //登录界面
axios.defaults.baseURL = options.personnelURL // 人事系统
// 默认请求头
// axios.defaults.headers.post['Content-type'] = 'application/json'
axios.defaults.headers['Content-Type'] = 'application/json'
axios.defaults.timeout = 10000
// axios.defaults.transformRequest = [function (data) {
//   return qs.stringify(data)
// }]

const instance = axios.create({
  headers: {'content-type': 'multipart/form-data'}
})

// http request 拦截器
axios.interceptors.request.use(config => {
  // 向服务器请求授权
  config.headers.Authorization = window.sessionStorage.getItem('token')
  if(config.method === 'post') {
    // 判断请求头的 content-type 处理相应的数据
    if(config.headers['Content-Type'] === 'application/json') {
      config.data = JSON.stringify(config.data)
    }else {
      config.data = qs.stringify(config.data)
    }
  }
  return config
}, err => {
  return Promise.reject(err)
})
// http response 拦截器
axios.interceptors.response.use(config => {
  return config
}, err => {
  return Promise.reject(err)
})

/*
* 封装 get 的方法
* @param url
* @param data
* @returns {Promise}
*
* */
export function httpGet(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then( res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}


/*
* 封装 post 请求
* @param url
* @param data
* @returns {Promise}
*
* */
export function httpPost(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(res => {
      resolve(res.data)
    },err => {
      reject(err)
    })
  })
}


/*
* 封装 post 请求 FormData方式
* @param url
* @param data
* @returns {Promise}
*
* */
export function postform(url, data = {}) {
  return new Promise((resolve, reject) => {
    instance.post(url, data).then(res => {
      resolve(res.data)
    },err => {
      reject(err)
    })
  })
}

/*
* 封装 put 请求
* @param url
* @param data
* @returns {Promise}
*
* */
export function httpPut(url, data) {
  return new Promise((resolve, reject) => {
    axios.put(url, data).then(res => {
      resolve(res.data)
    }, err => {
      reject(err)
    })
  })
}

/*
* 封装 delete 请求
* @param url
* @param data
* @returns {Promise}
*
* */
export function httpDelete(url) {
  return new Promise((resolve, reject) => {
    axios.delete(url).then(res => {
      resolve(res.data)
    }, err => {
      reject(err)
    })
  })
}