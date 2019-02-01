//express_demo.js 文件
var express = require('express');
 var dao = require('./dao/dao.js');
var add = require('./dao/add.js');
var edit = require('./dao/edit.js');
var app = express();

app.get('/', function (req, res) {
    res.send('Hello Worlfdsfdsd');
})
app.use('/dao', dao);//查
app.use('/add', add);//添
app.use('/edit', edit);//改
var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})