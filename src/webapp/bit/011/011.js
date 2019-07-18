

//代码数据区
    //buff格式 1兆
//创建buff
const data = new ArrayBuffer(32);
const v = new Uint16Array(data);

//运行状态
    //位置
    //环境
    //打断

//位置  寻址 addressing
    //找位置的方式
    //位置下标
    //自动进位值或方式

//环境 
    //按键 二进制 代表文字
    //层次
    //切换环境  

    /**
     * 寻址
     * @param {'0010'} way 进位方式如0010
     * @param {0} val      基地址 0
     * @param {4} carry  自动进位值 如4,16,64,256
     * @returns {int} 返回值 4
     */
function addressing(way,val,carry){
    return 4;
}


/**
 * 自动运行过程 包括暂停 这玩意应该是树形结构
 * @param {*} way 
 * @param {*} val 
 * @param {*} carry 
 */
function run(){
    try{ 
        main();
        addressing();
        run(); 
    }catch (error) {
        debug();
    }
}
function main(){
}



var count = 0;
var timer = null;

function print() {

    // 每次添加定时器前，移除前一个定时器
    clearTimeout(timer);

    //函数执行的语句
    console.log(count++);

    　　　　　　　　// 添加定时器
    　　　　　　　　timer = setTimeout(function () {print();}, 1);
    　　　　　　　　
    　　　　　　// 循环结束条件
    if(count == 100000) {
        clearTimeout(timer);
    }
} 

timer = setTimeout(function () { print(); }, 1);