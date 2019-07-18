

//创建buff
const buf = new ArrayBuffer(32);
const x1 = new Uint16Array(buf);
x1[0] = -2;
console.log(x1[0].toString(2))// 0
console.log(parseInt(x1[0].toString(2),2))// 0 
// 转二进制  x1[0].toString(2) 
//转十进制 parseInt( "101110100 ",2)
//写入
//读取
//转换成文字
//正则对比  异或  如 1100 1000
// 先用'与' '&' 取出特定位置的数值 
// 然后用 '异或''^' 对比 相同为 0
console.log((parseInt('1000',2)&parseInt('1110',2)).toString(2))
console.log((parseInt('1000',2)^parseInt('1000',2)).toString(2))