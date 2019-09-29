
import childProcess from 'child_process'
import fs from 'fs'
let  Service =qGuan.find("service")
let  Resource =qGuan.find("resource")

@Resource("showLetter")
class ShowLetter{
    // show  Windows letter
    /**
     * 获取目录
     * @returns {Promise<any>}
     */
      showLetter() {
          return    new Promise(async resolve => {
              try {
                  resolve(childProcess.execSync('wmic logicaldisk get caption'));
              } catch(error) {
                  reject(error)
              }
          })
    }
    //获取win盘符
    findWinLetter(){
        let ressss=new Promise(function (resolve) {
           let roots=  letter()
            roots .then(function (root) {
                let roote=root.toString();
                let nosds= roote.replace(new RegExp(/( )/g),"").split(/[\r+\n]+/)
                nosds  .splice(0, 1);
                nosds  .splice(nosds.length-1, 1);
                resolve(nosds)
            })
        })
        return ressss;

    }

        //
    findLinuxLetter(){
        let result=[];

        function finder(path) {

            let files=fs.readdirSync(path);

            files.forEach((val,index) => {

                let fPath=join(path,val);

                let stats=fs.statSync(fPath);

                if(stats.isDirectory()) finder(fPath);

                if(stats.isFile()) result.push(fPath);

            });



        }

        finder(startPath);

        return result;
    }

    //获取目录下的文件
    findDir(pid,dirPath){
        let result = fs.readdirSync(dirPath+"//");
        let resObj=new Array();
        debugger
        for (let i=0;i<result.length;i++){
            let res={};
            res.pid=pid;
            res.name=result[i];
          //  res.isDir=fs.lstatSync(dirPath+"//"+result[i]).isDirectory();
            resObj.push(res)
        }

        return resObj;
    }
    //移动或者重命名
    rename(id,path,path2){

        let rename=new Promise(function (resolve, reject) {
            fs.rename(path,path2,function(error){
                if(error){
                    //  console.log(error);
                    reject(false);
                    return;
                }
                resolve(true)
            })
        })
        return rename;
    }

    /**
     * 删除文件或文件夹
     * @param id
     * @param path
     * @returns {Promise<any>}
     */
    rmdir(id,path){
        let ress=new Promise(function (resolve, reject) {
            fs.rmdir(path,function(error){
                if(error){
                    //  console.log(error);
                    reject(false);
                    return;
                }
                resolve(true)
            })
        })
        return ress
    }

    /**
     * 创建文件夹
     * @param id
     * @param path
     * @returns {Promise<any>}
     */
    mkdir(pid,path){
        let res=new Promise(function (resolve, reject) {
            fs.mkdir(path,function(error){
                if(error){
                    //  console.log(error);
                    reject(false);
                    return;
                }
                resolve(true)
            })
        })

        return res;
    }



}
function letter() {
    let res=       new Promise( function (resolve) {
        childProcess.exec('wmic logicaldisk get caption', function (err, stdout, stderr) {
            if (err || stderr) {
                console.log("root path open failed" + err + stderr);
                return;
            }
            resolve(stdout)
        })
    })
    return    res;
}

module.exports =ShowLetter ;