


export  default  class {
    //获取Cookie

   static getCookie (name) {
        let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)){
            return arr[2];
        }
        else
            return null;
    };
// 设置Cookie
    static  setCookie (name,value){
        let Days = 30;
        let exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + value + ";expires=" + exp.toGMTString()+";path=/"
    };
//删除Cookie
    static  delCookie  (name){
        let exp = new Date();
        exp.setTime(exp.getTime() - 1);
        let cval = this.getCookie(name);
        if (cval != null)
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString()+";path=/"
    };
}