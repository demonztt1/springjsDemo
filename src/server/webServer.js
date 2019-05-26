import express  from 'express';

import bodyParser  from 'body-parser';

var app = express();


//获取数据库连接对象
var connection = require('../config/mysqldb');

var verify = require('./admin/verify')
var user = require('./controller/userCtrl')
//处理post字段请求
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//处理跨域请求
app.all("*", function(req, res, next) {
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
app.get('/',function(req,res){
    res.send('请求home成功');
})



app.use(verify)
app.use('/user',user)

const port =  8080;
app.listen(port, () => {
    console.log('Express server listening on port ' + port);
});