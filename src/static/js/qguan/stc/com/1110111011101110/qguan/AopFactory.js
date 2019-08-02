import AopProxy from './AopProxy.js'
//var babel = require("@babel/core");
/**
 * aop工厂
 *
 * 处理类一个
 * 实体类一个
 *
 * 返回被aop过的处理过的类
 */
export default class AopFactory{
    constructor(){
        //es5转 es6的选项  import 加 注解 @ decorator
        if( qGuan.inBrowser){
            this. options= {
                "plugins": [
                    ["proposal-decorators" , { "legacy": true }],
                    ["syntax-dynamic-import"]

                ],
                presets: ['react']
            }

            this.babel=Babel;
            this.load=this.loadJs;
        }else {
            this. options= { presets: [ '@babel/env' ],
                "plugins": [
                    ["@babel/plugin-proposal-decorators", { "legacy": true }],
                    ["@babel/plugin-syntax-dynamic-import"]

                ]
            }

            this.babel=require("@babel/core");
            this.load=this.requireFromString;
        }



    }
    //nodejs 字符串动态加载
    requireFromString(src, filename) {
        var Module = module.constructor;
        var m = new Module();
        m._compile(src, filename);
        return m.exports;
    }
    //web 加载
      loadJs(code){
        var head = document.getElementsByTagName('head')[0];
        var script=document.createElement('script');
        script.type="module";
        script.innerHTML=code
        let obj = head.appendChild(script);
        return obj;
    }
    /**
     * 通过code直接创建
     */
    createCodeObj(name,code){
        if(qGuan.inBrowser){
            let result = this.babel.transform(
                code,this.options
            );
            let codeobj=  this.load(result.code, name);
            return codeobj;
        }else {
            this.babel.transformAsync(code, this.options).then(result => {
                let codeobj=  this.load(result.code, name);
                return codeobj;
            });
        }

    }
    //生成普通实体类
    createObj(name,target) {
        //是否AOP
        if (qGuan.aop) {
            let obj=  new target();
            return    this.createAopObj(name,obj,{});
        }else {
            return new target();
        }
    }


    //生成 aop 的实体类
    createAopObj(name,obj,reg){
        let  regf = qGuan.find(name,obj,reg,'aopContext')
        let  aopProxy= new  AopProxy();
        aopProxy.aopFuns=regf
        return  new Proxy(obj, aopProxy)

    }
}

