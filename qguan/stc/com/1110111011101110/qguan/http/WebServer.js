import http  from "http";

import ApplicationContext from "../ApplicationContext";

import  querystring from  'querystring' ;

class WebServer{


    load(port){
        var parsePostBody = function (req, done) {
            var length = req.headers['content-length'] - 0;
            var arr = [];
            var chunks;


            try {
                req.on('data', buff => {
                    arr.push(buff);
                });
                req.on('end', () => {
                    chunks = Buffer.concat(arr);
                    done(chunks);
                });
            } catch(err) {

            }

        };

        http.createServer(function(req,res){

            // 获取请求主体内容
     /*     req.on('data', function (thunk) {

            });*/
            try {
                res.setHeader("Content-Type", "application/json;charset=utf-8");
                res.setHeader("Access-Control-Allow-Origin", "*");
                parsePostBody(req, (chunkss) => {
                    req.body= JSON.parse( chunkss.toString() );  // 关键代码
                    this.context= ApplicationContext.getInstance()
                    this.context.findBend(req,res,null,"http")

                })
            } catch(e) {
                console.log('  ', e,'   ', e.stack);
                try {
                    res.end(e.stack);
                } catch(err) {

                }
            }


        }).listen(port);
    }
}



module.exports = WebServer;