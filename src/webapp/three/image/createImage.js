
import jquery from 'jquery'
import * as THREE from "three/src/Three";
window.$=jquery;

var drawing=document.getElementById("drawing");
//确定浏览器支持<canvas>元素

class  CreateShow{
    constructor(){
        this.context=drawing.getContext("2d");
        //绘制填充底色
        this.context.fillStyle="#d2d2d2";
        this.context.fillRect(0,0,100,100);
        this. buffer = new ArrayBuffer(2);
        this.int8View = new Int8Array(  this. buffer);
        this.int8View[0] = 170;
        this.int8View[1] = 254;


        this.radix=10;


        this.createData()
        this.zoom()
    }
    createData(){
        for(let i=0;i<100;i++){
            let x=  parseInt ((i%10)%10) *10;
            let y = parseInt(i/10) *10;
            this.context.fillStyle="#FFFFFF";
            this.context.fillRect(x+1,y+1,8,8);
        }
    }

    zoom(){

      let canvass=   this.createCanvas(this.radix*10);
        var ctx = canvass.getContext('2d');
        //取得图像的数据URI
        var newImg = new Image();
        newImg.src = drawing.toDataURL("image/png");
//显示图像
     /*   let image=document.createElement("img");
        image.src=imgURI;*/
        ctx.fillStyle="#ff0017";
        ctx.fillRect(0,0,1000,1000);
        for(let i=0;i<100;i++){
            let x=  parseInt ((i%10)%10) *10*10;
            let y = parseInt(i/10) *10*10;
            ctx.drawImage(drawing,x+1,y+1,98,98);
            ctx.fillStyle="#FFFFFF";
            ctx.fillRect(x+1,y+1,8,8);
        }
        var image=document.createElement("img");
        image.src= canvass.toDataURL("image/png");;
        document.getElementById("container").appendChild(image);
    }

    /**
     * 基数 *10的画布
     * @param radix
     */
    createCanvas(radix){
        let canvas = document.createElement('canvas');
      //  canvas.id = "CursorLayer";
        canvas.width = radix*10;
        canvas.height = radix*10;
        canvas.style.zIndex = 8;
        canvas.style.position = "absolute";
        canvas.style.border = "1px solid";
        return canvas;
    }


}

if(drawing.getContext){

   /* var  context=drawing.getContext("2d");
    //绘制填充底色
     context.fillStyle="#d2d2d2";
     context.fillRect(0,0,200,200);

    for(let i=0;i<10000;i++){
        let x=  parseInt ((i%10)%10) *10;
        let y = -parseInt(i/10) *10;
        context.fillStyle="#000000";
        context.fillRect(x+1,y+1,x+8,y+8);
    }*/


    let createShow=new CreateShow();
//取得图像的数据URI
    var imgURI=drawing.toDataURL("image/png");
//显示图像
    var image=document.createElement("img");
    image.src=imgURI;
   // document.body.appendChild(image);
}


/**
 * 加载保存数据
 * 主要以位加载 ，如 100位  10000位加载
 * 从多少位开始加载。
 * 注：主要功能就是把字节转换成比特
 *
 */
class  load{


    /**
     *
     * @param num   第几个 从1开始
     * @param base  基数 如 10 100 1000等
     */
    find(num,base){
    }

    /**
     *
     * @param num  第几个 从1开始
     * @param base 基数 如 10 100 1000等
     * @param datas 数据，通常是数组 ["1", "1", "1", "1", "1", "1", "1", "1"]
     */
    save(num,base,datas){

    }


    /**
     * buf 转字符串数组
     * console.log(fill(buffer[0]);
     * @param num (buffer[0]) 255
     * @param n
     * @returns {*} ["1", "1", "1", "1", "1", "1", "1", "1"]
     */
    fill(num){
        let src = num.toString(2);
        let len = num.toString(2).length;
        while (len < 8) {
            src = "0" + src;
            len++;
        }
        return  src.split("");
    }

    /**
     * 字符串转 buf
     * @param strs ["1", "1", "1", "1", "1", "1", "1", "1"]
     * @returns {ArrayBuffer} 255
     */
      str2ab(strs) {
        let buf = new ArrayBuffer(1); // 每个字符占用2个字节
        let bufView = new Uint16Array(buf);
        bufView[0] =parseInt(to.join(""),2)
        return buf;
    }

}