var URL = require('url');
var mysql = require('mysql');
var express = require('express');
var router = express.Router();

//创建连接
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    database : 'test'
});



//执行创建连接
connection.connect();
//SQL语句
var  editSql = 'UPDATE xxx SET  `name`=?  WHERE id = ?';

router.get('/', function(req, res, next) {
    //解析请求参数
    var params = URL.parse(req.url, true).query;
    var editSqlParams = [ params.name,params.id ];

    //增
    connection.query(editSql,editSqlParams,function (err, result) {
        if(err){
            console.log('[UPDATE  ERROR] - ',err.message);
            return;
        }
    });


});

module.exports = router;