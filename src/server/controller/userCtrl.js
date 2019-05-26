import  express  from 'express';
import User  from '../entity/User';

import  UserService from '../service/user/userService'
var router = express.Router();

let userService =new UserService;
//用户登录
router.post('/login', (req,res) => {
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
    try{

         userService.findById(user,function (resUser) {
           res.json({
               message: '请求成功',
               token: resUser
           })
           return;
       })

       // let token = jwt.sign({name:user.name},secretkey,{expiresIn: 60*8});

    }catch (e) {
        console.log(e.stack)
        res.json({
            message: '异常'
        })
        return;
    }

})
//获取用户列表
router.post('/getList',(req,res)=>{
    var listStr = userService.findAll()
        res.json({
            message: '请求成功',
            resultCode: 1,
            info: listStr
        })
        return;
})
//用户注册
router.post('/register',(req,res)=>{
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

})



module.exports = router;