
//import  ApplicationContext from '../ApplicationContext';

export default function Aop(...list) {
    return function (target) {
       // let context =ApplicationContext.getInstance();
        qGuan.aop=true;
        qGuan.saveBend(list[0],new target()) ;
    }
}