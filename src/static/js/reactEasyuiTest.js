
import reactEasyuiTest from './reactEasyuiTest.html'




function loadJs(code,callback){
    var head = document.getElementsByTagName('head')[0];
    var script=document.createElement('script');
    script.type="module";
    if(typeof(callback)!="undefined"){
        if(script.readyState){
            script.onreadystatechange=function(){
                if(script.readyState == "loaded" || script.readyState == "complete"){
                    script.onreadystatechange=null;
                    callback();
                }
            }
        }else{
            script.onload=function(){
                callback();
            }
        }
    }
    script.innerHTML=code
    head.appendChild(script);
}
loadJs(output.code,function(){
    alert('done');
});
