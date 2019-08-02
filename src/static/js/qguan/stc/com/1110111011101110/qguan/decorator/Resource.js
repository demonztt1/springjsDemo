//import  ApplicationContext from '../ApplicationContext'
export default function Resource(...list) {
    return function (target) {
        let obj= qGuan.find(target.name);
        if(!obj){
            obj=   new target();
        }
        for(let i=0;i<list.length;i++){
            obj[list[i]]= qGuan.find(list[i])
        }
        qGuan.saveBend(target.name,obj) ;
    }
}