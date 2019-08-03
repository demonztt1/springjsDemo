/*
import  ApplicationContext from '../ApplicationContext'*/
import  AopFactory  from  '../AopFactory.js';

export default function Modular(...list) {
    return function (target) {
        let obj= QcreateElement(target, null)
       let aopFactory=new AopFactory();
       let aopObj= aopFactory .createAopObj(target.name,obj,{});

        qGuan.saveBend(list[0],aopObj) ;
    }
}