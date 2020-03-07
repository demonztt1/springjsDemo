
import  cookieUtils from "./cookieUtils.js"
export default class {


   static save(token){
        cookieUtils.setCookie("token",token);
    }

    static find(){
     return  cookieUtils.getCookie("token")
    }

    static  del(){
       cookieUtils.delCookie("token");
    }
}