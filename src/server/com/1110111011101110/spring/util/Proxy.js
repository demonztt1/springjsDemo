/**
 * js 动态代理
 */

class SpringProxy{
    constructor(obj ,method,args){
        let loader;
        loader=Object.assign(obj);
        eval("loader."+ method + "(" + this.ergodic(args)+")")
    }
    ergodic (par){
            let res=""
            if(par.length>0){
                res="args[0]"
            }
           for(let w=1;w<par.length;w++){
            res=res+",args["+w+"]"
         }
     return res;
    }
}

module.exports = SpringProxy
