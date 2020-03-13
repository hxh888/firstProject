import axios from 'axios';
import { Message } from 'element-ui';
import router from "../router/index";
import VueI18n from 'vue-i18n';
axios.defaults.timeout = 800000;

// 环境的切换
// if (process.env.NODE_ENV == 'development') {
//     axios.defaults.baseURL = '/apiLogin';
// } else if (process.env.NODE_ENV == 'debug') {
//     axios.defaults.baseURL = '';
// } else if (process.env.NODE_ENV == 'production') {
//     axios.defaults.baseURL = '';
// }

// http request 拦截器
axios.interceptors.request.use(
  config => {
    // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
    // const token =localStorage.getItem('token');
    config.data = JSON.stringify(config.data);
    config.headers = {
      'Content-Type':'application/json;charset=UTF-8',
      // "Access-Control-Allow-Origin ":"*",
      // "Access-Control-Allow-Headers":"Content-Type,Content-Length, Authorization, Accept,X-Requested-With",
      // "Access-Control-Allow-Methods":"PUT,POST,GET,DELETE,OPTIONS",
      'token':window.sessionStorage.getItem('token')
    }
    // if(token){
    //   config.params = {'token':token}
    // }
    return config;
  },
  error => {
    Message.error({message: i18n.t('Request_timed_out')});
    return Promise.reject(err);
  }
);


// http response 拦截器
axios.interceptors.response.use(
  response => {
    if(response.data.errCode ==2){
      router.push({
        path:"/login",
        querry:{redirect:router.currentRoute.fullPath}
      })
    }
    return response;
  },
  err => {
    if (err.response.status == 504||err.response.status == 404) {
      Message.error({message: i18n.t('Server_exception')});
    } else if (err.response.status == 403) {
      router.push({
        path:"/login",
      })
    }else {
      Message.error({message: i18n.t('Unknown_mistake')});
    }
    return Promise.reject(err)
  }
)

let lang = {'bmsLanguage' : window.sessionStorage.getItem('lang') || 'zh'}
if (lang.bmsLanguage == 'zh') {
  lang.bmsLanguage = 'zh_CN'
} else if (lang.bmsLanguage == 'en') {
  lang.bmsLanguage = 'en_US'
} else {
  lang.bmsLanguage = 'zh_TW'
}

let loginId
let timer = setInterval(() => {
  loginId = JSON.parse(window.sessionStorage.getItem('store')) && JSON.parse(window.sessionStorage.getItem('store')).loginData.userLogin && JSON.parse(window.sessionStorage.getItem('store')).loginData.userLogin.loginId
  if(loginId) {
    clearInterval(timer)
  }
}, 20);

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url,params={}){
  return new Promise((resolve,reject) => {
    axios.get(url,{
      params:{...lang, loginId, ...params}
    })
    .then(response => {
      resolve(response.data);
    })
    .catch(err => {
      reject(err)
    })
  })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

 export function post(url,data = {}){
   return new Promise((resolve,reject) => {
     axios.post(url,{...lang, loginId, ...data})
          .then(response => {
            resolve(response.data);
            // resolve(this.$utils.decrypt(response.data))
          },err => {
            reject(err)
            // reject(this.$utils.decrypt(err))
          })
   })
 }

 
