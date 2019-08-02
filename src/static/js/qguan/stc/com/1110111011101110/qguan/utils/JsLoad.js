import  AopFactory  from  '../AopFactory.js';
/**
 * 扫描路径
 * @param path
 * @param name
 * @returns {*}
 */
export default class JsLoad{
    load(dir){
        let aopFactory=new AopFactory();
        let code=$.ajax({url:dir,async:false}).responseText;
        let filename = dir.substring(dir.lastIndexOf('\/') + 1, dir.lastIndexOf('.'));
       let obj =aopFactory.createCodeObj(filename,code);
    }
}

