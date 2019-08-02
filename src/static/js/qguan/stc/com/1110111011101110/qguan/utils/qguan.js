import path from 'path';
import  fs from  'fs';




export default function qguan(isTestable) {

    let myPath = path.join(__dirname,'../../../../',isTestable);

    fs.readFile(myPath ,'utf-8', function(err, data) {
        // 读取文件失败/错误
        if (err) {
            throw err;
        }
        // 读取文件成功
        console.log(data);
    });


    return function(target) {
        target.isTestable = isTestable;
    }
}

