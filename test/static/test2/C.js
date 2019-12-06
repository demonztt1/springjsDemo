let Aop =qGuan.find("aop")
@Aop("c",['setState'])
export default class  C{
    constructor(){
        console.log(" 创建C")
    }
    before(trapTarget,proName,proValue,receiver){
           console.log(" before 执行")
    }
    after(trapTarget,proName,proValue,receiver){
        console.table("after")
       }
    afterReturning(){
        console.log(" afterReturning 执行")
    }
    afterThrowing(err){
        console.log("异常  "+err)
    }
    around(){
        console.log(" around 执行")
    }

}
