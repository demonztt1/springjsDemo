import {ApplicationContext}  from './ApplicationContext'

export default function Service(...list) {
    return function (target) {

     let obj=    new  target();
     debugger
     console.log(obj)
        debugger
    }
}