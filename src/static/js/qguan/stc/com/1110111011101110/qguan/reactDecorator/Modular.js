/*
import  ApplicationContext from '../ApplicationContext'*/
import  AopFactory  from  '../AopFactory.js';

export default function Modular(...list) {
    return function (target) {
        qGuan.saveBend(list[0],target) ;
    }
}