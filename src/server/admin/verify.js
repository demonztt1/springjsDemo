import express  from 'express';

var router = express.Router();
//var jwt = require('jsonwebtoken');
//import jwt from 'jsonwebtoken'
var secretkey = 'secretkey';

router.use(function(req,res,next){
    if(req.url !='/user/login' && req.url !='/user/register'){
        //token可能存在post请求和get请求
        let token = req.body.token || req.query.token || req.headers.token;
/*
        jwt.verify(token,secretkey,function(err,decode){
            if(err){
                res.json({
                    message: 'token过期，请重新登录',
                    resultCode: '403'
                })
            }else{
                next();
            }
        })
*/
    }else{
        next();
    }
})


module.exports = router;