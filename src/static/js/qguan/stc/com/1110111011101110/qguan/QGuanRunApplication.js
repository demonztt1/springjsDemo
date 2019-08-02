import ApplicationContext  from  './ApplicationContext.js';
/*
import  ZipLoad  from  './utils/ZipLoad';
import  HttpContex  from  './http/HttpContex';


import  DirLoad from './utils/DirLoad'


import  WebServer from './http/WebServer'*/
import  RunLoad  from  './utils/RunLoad.js';
import  JsLoad  from  './utils/JsLoad.js'
import  AopContext  from './aopDecorator/AopContext.js';
import  Aop  from './aopDecorator/Aop.js';
import Service    from  './decorator/Service.js';
import Resource    from  './decorator/Resource.js';
import AopFactory    from  './AopFactory.js';
import  Modular from './reactDecorator/Modular.js'

import  ModularAop from './reactDecorator/ModularAop.js'

/*import  Controller   from  './http/Controller';*/
const inBrowser = typeof window !== 'undefined'

class QGuanRunApplication{

    constructor(str,resolve){
      // this.applicationContext =ApplicationContext.getInstance();
        console.log("启动 轻管")
      let context=  this.applicationContext=ApplicationContext.getInstance();
        if(inBrowser){
            window.qGuan=context
        }else {
            global.qGuan =context
        }
        qGuan.inBrowser=inBrowser;


        let aopContext=new AopContext();
         context.saveBend('aopContext',aopContext) ;// aop

        let jsLoad=new JsLoad();
        context.saveBend('jsLoad',jsLoad) ;//jq加载
    /*    let dirLoad=new DirLoad();
        context.saveBend('dirLoad',dirLoad) ;//文件夹扫描
        let zipLoad=new ZipLoad();
        context.saveBend('zipLoad',zipLoad) ;//文件夹扫描*/

        let aopFactory=new AopFactory();
        context.saveBend("aopFactory",aopFactory)
        context.saveBend("service",Service);

       /* context.saveBend("controller",Controller);*/
        context.saveBend("modular",Modular);
        context.saveBend("modularAop",ModularAop);
        context.saveBend("resource",Resource);


        context.saveBend("aop",Aop);
  /*      let http=new HttpContex();
        context.saveBend('http',http) ;//文件夹扫描*/

        if(inBrowser){
            window.qGuan=context
        }else {
            global.qGuan =context
        }
        qGuan.inBrowser=inBrowser;
     return  RunLoad(resolve,str);

    }

}

export default function runApplication(...list) {
    return function (target) {
       new Promise(function(resolve ){
           return new QGuanRunApplication(list,resolve)
        }).then(function(){
          /* let webServer= new WebServer()
            webServer.load(8080)*/
        }).then(function () {
           let A=qGuan.find("A")
           console.log(A)
            console.log("启动成功")
        });
    }

}
