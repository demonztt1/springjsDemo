const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin=require('clean-webpack-plugin');
const CopyWebpackPlugin=require('copy-webpack-plugin');
var glob = require('glob')

const path=require('path');
var target="http://192.168.20.105:8080/admin";
const config={
    mode:"none",
    entry:  {
        xxx:__dirname + "/src/webapp/js/xxx.js"

    } ,//已多次提及的唯一入口文件*/
    // entry: entries(),
    output: {
        path: __dirname + "/dist/",//打包后的文件存放的地方
        filename: "js/[name]_[hash].js"//打包后输出文件的文件名
    },
    plugins: [
        new CleanWebpackPlugin(['dist/']), //清除旧数据
     /*   new CopyWebpackPlugin([{  //拷贝
            from: __dirname + '/src/plugins',
            to:__dirname + '/dist/plugins'
        },
            ),*/


        new HtmlWebpackPlugin({template: "src/webapp/view/xxx.html",
            filename:"index.html",
            chunks:['xxx' ]
        } )
    ],
    devServer:{
        contentBase: path.join(__dirname,"/dist"),
        compress:true,
        port:7070,
        host:'0.0.0.0',
        proxy:{  //代理
            "/loginController":{
                target:target,
                changeOrigin:true
            }
        }
    }
}



//entries函数
var entries= function () {
    var jsDir = path.join(__dirname,"/src/static")
    var entryFiles = glob.sync(jsDir + '/**/*.{js,jsx}')
    for (var i = 0; i < entryFiles.length; i++) {
        var filePath = entryFiles[i];
        var fpath = filePath.substring(filePath.lastIndexOf('\/static\/') + 1, filePath.lastIndexOf('.'));
        var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
        config.entry[filename]=__dirname + "/src/"+fpath;
        config.plugins.push(
            new HtmlWebpackPlugin( {
                template: "src/"+fpath+".html",
                filename:fpath+".html",
                chunks:['launch','utils',filename]
            } )
        )
    }
}
//entries(); 批量添加
module.exports = config