let buffer = new ArrayBuffer(16);
var view1 = new DataView(buffer);

// 字符串转为ArrayBuffer对象，参数为字符串
function str2ab(str) {
    var buf = new ArrayBuffer(str.length*2); // 每个字符占用2个字节
    var bufView = new Uint16Array(buf);
    for (var i=0, strLen=str.length; i<strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}
let bufs=str2ab("1111")
debugger
console.log(bufs)