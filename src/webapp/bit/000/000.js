window.two=two;
window.unCode=unCode;
window.totwosys=totwosys;
window.tocoding=tocoding;
window.pdtoSting=pdtoSting;
var list=[96,97,98,99,100,101,102,103,104,105] 
var pdtwosys={}; 
var pdcoding ={}; 
//绑定
function two(){
    var val=$("#code").val().split(/[\r\n]+/); 
    for(var i= 0;val.length>i;i++){
        var code=val[i].split(/\s+/);
        let v0=code[0];
        let v1=code[1];
        let v2=code[2];
        keyCode(code[0],code[1],code[2]);
        setval(pdtwosys,v2,v1);
        setval(pdcoding,v1,v2);
    }
}
//打印pd
function pdtoSting(){
    console.log(pdtwosys);
    console.log(pdcoding);
}
//把值set到变量里面
function setval(boj,key,val){
    boj[key]=val;
}
//绑定事件
function keyCode(v0,v1,v2){
    $(document).keydown(function(event){ 						
        　　　　if(event.keyCode == list[v0] ){							
                     $("#twosys").val( $("#twosys").val()+v1);
                     $("#coding").val($("#coding").val()+v2); 
        　　　　}
    });
}

//解除事件
function unCode(){
    $(document).unbind(); 
}

//编译成二进制
function totwosys(){
    var licoding =$("#coding").val();
    for(var i= 0;licoding.length>i;i++){
        var c1=licoding.substring(i,i+1);
        $("#twosys").val( $("#twosys").val()+pdtwosys[c1]);
    }
}

//编译成中文
function tocoding(){
    var litwosys =$("#twosys").val();
    for(var i= 0;litwosys.length>i;i=i+4){
        var t1=litwosys.substring(i,i+4);
        $("#coding").val( $("#coding").val()+pdcoding[t1]);
        //events(t1);
    }
}

//执行某个事件
function events(obj){
    if(obj=='0000'){
        alert("0000")
    }
}

//运行
function run(n,l){
    var litwosys =$("#twosys").val();
    if(n>=litwosys.length){
        setTimeout(run(n,l),1000);
    }else{
        setTimeout(run(n,l),200);
    }
    

    
}