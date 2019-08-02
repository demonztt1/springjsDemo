
//初始加载

//import nodeLoad from './NodeLoad.js';
import  webLoad from  './WebLoad.js';




export default function RunLoad(resolve,isTestable) {

    if(qGuan.inBrowser){
        webLoad(resolve,isTestable);
    }else {
        nodeLoad(resolve,isTestable);
    }

}
