/*
import  ApplicationContext from '../ApplicationContext'*/
import  AopFactory  from  '../AopFactory.js';

export default function Service(...list) {
    return function (target) {
        let aopFactory=new AopFactory();
        let obj= aopFactory.createObj(list[0], target)
        qGuan.saveBend(list[0],obj) ;
    }
}