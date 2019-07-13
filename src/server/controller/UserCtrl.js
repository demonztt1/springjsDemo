

import { Controller } from './qguan/stc/com/1110111011101110/qguan/http/Controller.js'

import { Resource } from './qguan/stc/com/1110111011101110/qguan/decorator/Resource.js'

import User  from  './src/server/entity/User.js'

@Controller("/user")
@Resource("userService")
class UserCtrl{
    //用户登录
    @Controller("/login")
    login(req,res){
        let user=new User();
        user.name = req.body.name;
        user.pwd = req.body.pwd;

        if(!user.name||!user.pwd){
            res.status='404';
            res.write({
                message: '用户名或密码错误',
                resultCode: 1
            })
            return;
        }
        try{

            res.write(JSON.stringify({
                message: '请求成功',
                token: "xxxxxx"
            }))

        /*    this.userService.findById(user,function (resUser) {
                res.write({
                    message: '请求成功',
                    token: resUser
                })

            }) */

            // let token = jwt.sign({name:user.name},secretkey,{expiresIn: 60*8});

        }catch (e) {
            console.log(e.stack)
            res.write({
                message: '异常'
            })
            return;
        }

    }
//获取用户列表
    @Controller("/getList")
    getList(req,res){

        res.write(JSON.stringify({
            message: '请求成功',
            token: "getList"
        }))

     /*   var listStr = this.userService.findAll()
        res.json({
            message: '请求成功',
            resultCode: 1,
            info: listStr
        })*/
        return;
    }

//用户注册
    @Controller("/register")
    register(req,res){
        let user=new User();
        user.name = req.body.name;
        user.pwd = req.body.pwd;
        if(!user.name||!user.pwd){
            res.status='404';
            res.send({
                message: '用户名或密码错误',
                resultCode: 1
            })
            return;
        }
        try {
            let result=userService.add(user)
            if(result){
                json.message= '请求失败用户已经存在';
                json.resultCode = 1;
            }else {
                json.message = '请求成功';
                json.resultCode = 0;
            }
            res.send(JSON.stringify(json))
        }catch (ex) {
            console.log(ex)
        }

    }
}


module.exports = UserCtrl;