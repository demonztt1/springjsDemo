var fs = require('fs');

/*var result =fs.mkdir('e:/work/中文1',function(error){
    if(error){
        console.log(error);
        return false;
    }
    console.log('创建目录成功');
})*/

let res=new Promise(function (resolve, reject) {
    fs.mkdir('e:/work/中文9',function(error){
        if(error){
          //  console.log(error);
            reject(false);
            return;
        }
        resolve(true)
         })
})
let ress=new Promise(function (resolve, reject) {
    fs.rmdir('e:/work/中文9',function(error){
        if(error){
            //  console.log(error);
            reject(false);
            return;
        }
        resolve(true)
    })
})
ress.then(function (resolve) {

    console.log("false删除 ++"+resolve);
}).catch(e => {
    console.log('promise false删除：' + e);
});

res.then(function (resolve) {

    console.log("false ++"+resolve);
}).catch(e => {
    console.log('promise catch捕获：' + e);
});


let rename=new Promise(function (resolve, reject) {
    fs.rename('e:/work/中文2','e:/work/中文3',function(error){
        if(error){
            //  console.log(error);
            reject(false);
            return;
        }
        resolve(true)
    })
})

/*var stat = fs.lstatSync('C://VRLServer.txt');
var work = fs.lstatSync('C://work');
console.log(stat.isDirectory())
console.log(work.isDirectory())*/
