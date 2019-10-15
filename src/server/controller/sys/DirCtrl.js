
let  Controller =qGuan.find("controller")
let  Resource =qGuan.find("resource")


@Controller("/dir")
@Resource("ShowLetter")
class DirCtrl {
    //获取下级目录和和文件
    @Controller("/findDir")
    findDir(req, res) {
        let roots = this.ShowLetter.findDir(req.body.id, req.body.dir)

        roots.then(function (root) {

            res.write(JSON.stringify(root))
            res.end();
        })

        return

    }

//获取根目录
    @Controller("/findRootDir")
    findRootDir(req, res) {
        let roots = this.ShowLetter.findWinLetter();
        roots.then(function (root) {
            let dirs=[];
            root.forEach((dir)=>{
                dirs.push({name:dir,isDir:true})
            })
            res.write(JSON.stringify(dirs))
            res.end();
        })

        return;
        //return this.showLetter.findWinLetter()
    }

//新建目录
    @Controller("/mkDir")
    mkDir(req, res) {
        let roots = this.ShowLetter.mkdir(req.body.pid, req.body.dir);
        roots.then(function (root) {
            res.write(JSON.stringify({pid:req.body.pid,res:root}))
            res.end();
        })
            .catch(()=> {
                res.write(JSON.stringify({pid:req.body.pid,res:false}))
                res.end();
            })

        return;
        //return this.showLetter.findWinLetter()
    }

    //删除目录
    @Controller("/delDir")
    delDir(req, res) {
        let roots = this.ShowLetter.rmdir(req.body.id, req.body.dir);
        roots.then(function (root) {
            res.write(JSON.stringify({id:req.body.id,res:root}))
            res.end();
        })
            .catch(()=> {
                res.write(JSON.stringify({id:req.body.id,res:false}))
                res.end();
            })

        return;
    }

    //修改目录
    @Controller("/rename")
    rename(req, res) {
        let roots = this.ShowLetter.rename(req.body.id, req.body.dir,req.body.newDir);
        roots.then(function (root) {
            res.write(JSON.stringify({id:req.body.id,res:root}))
            res.end();
        })
            .catch(()=> {
                res.write(JSON.stringify({id:req.body.id,res:false}))
                res.end();
            })

        return;
        //return this.showLetter.findWinLetter()
    }


}


module.exports = DirCtrl;