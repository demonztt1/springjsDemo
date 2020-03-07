import axios from 'axios'
import tokenUtils from "./tokenUtils.js"

let globalCode={
    success:200,
    timeout:false,
    busyCode:false,
    loginCode:401               //没有登录
}
const instance = axios.create({
    //当创建实例的时候配置默认配置
    xsrfCookieName: 'xsrf-token'
});

//添加请求拦截器
instance.interceptors.request.use(function(config){
    //在发送请求之前做某事，比如加一个loading
 /*   if(commonInfo.hasLoading){
        Toast.loading('', 3);
    }*/

    let token = tokenUtils.find();
    if (token) {
        //将token放到请求头发送给服务器,将tokenkey放在请求头中
        config.headers.Authorization = token;
    }
    config.url="/api"+config.url;
    console.log("请求之前")
    return config;
},function(error){
    //请求错误时做些事
  //  Toast.hide();
    console.log("配置请求失败")
    return Promise.reject(error);
});

//添加一个响应拦截器
instance.interceptors.response.use(function (response) {
    // 1.成功
   // if (response.data.success && response.data.status === globalCode.success) {
    if ( response.data.status === globalCode.success) {
        /*if(commonInfo.hasLoading){
            Toast.hide();
        }*/
        return response.data.data;
    }

    // 2.session过期
    if (!response.data.success && response.data.status === globalCode.timeout) {
       /* Toast.hide();
        Toast.info("会话过期，请重新登录", 1);*/
       // createHashHistory().push('/login');

        // 定义一个messagecode在后面会用到
        return  Promise.reject({
            messageCode: 'timeout'
        })
    }

    // 3.11111111 系统异常、网络异常
    if (response.data.success && response.data.status === globalCode.busyCode) {
     /*   Toast.hide();
        Toast.info(response.data.message, 1);*/
        return  Promise.reject({
            messageCode: 'netError'
        })
    }
    // 4没有登录
    if (response.data.success && response.data.status === globalCode.loginyCode) {
        /*   Toast.hide();
           Toast.info(response.data.message, 1);*/
        return  Promise.reject({
            messageCode: '没有登录'
        })
    }
    // 3.其他失败，比如校验不通过等
    return Promise.reject(response.data);
}, function () {
/*    Toast.hide();
    // 4.系统错误，比如500、404等
    Toast.info('系统异常，请稍后重试！', 1);*/
    return Promise.reject({
        messageCode: 'sysError'
    });
});

export default instance;
