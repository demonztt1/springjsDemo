
export default function WebLoad(resolve,isTestable) {


    let data=$.ajax({url:'/static/qguan.config',async:false}).responseText;

    // 读取文件成功
    let lint=data.split(/[\r\n]/);
    for (let i=0;i<lint.length;i++){
        let word =lint[i].split(',');
        let load;
        if(word.length>3){
            load =qGuan.findBend(word[3].trim());
        }
        if(load){
            load.load(word[0].trim(),word[1].trim(),word[2].trim(),word[3].trim());
        }
    }
    return resolve('200 OK');

}