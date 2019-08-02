/*
import  ApplicationContext from '../ApplicationContext'*/
import  AopFactory  from  '../AopFactory.js';

export default function ModularAop(...list) {
    console.log(list[0])
    return function (target, property, descriptor) {
        console.log(list[0])
        console.log(property)
    }
}