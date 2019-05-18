const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin=require('clean-webpack-plugin');
const CopyWebpackPlugin=require('copy-webpack-plugin');
var glob = require('glob')

const path=require('path');
var target="http://192.168.20.105:8080/admin";
const config={
    mode:"none",
 /*   entry:  {
        index:__dirname + "/src/webapp/index.js"
    } ,*///已多次提及的唯一入口文件*/
     entry:{},
    output: {
        path: __dirname + "/dist/",//打包后的文件存放的地方
        filename: "js/[name]_[hash].js"//打包后输出文件的文件名
    },
    module:{
        rules: [
            //暴露$和jQuery到全局
            {
                test: require.resolve('jquery'), //require.resolve 用来获取模块的绝对路径
                use: [{
                    loader: 'expose-loader',
                    options: 'jQuery'
                }, {
                    loader: 'expose-loader',
                    options: '$'
                }]
            },
            {
                test: /\.css$/,
                use:[
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]_[hash].[ext]',
                            publicPath: '/images/',
                            outputPath: 'images/'
                        }
                    }
                ]
            },
            {
                test: /\.(html|shtml)$/,
                use: [
                   {
                        loader: "html-withimg-loader"
                    } ,
                    {
                        loader: 'html-loader',
                        options: {
                            attrs: [':dist']
                            }
                        }
            ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist/']), //清除旧数据
     /*   new CopyWebpackPlugin([{  //拷贝
            from: __dirname + '/src/plugins',
            to:__dirname + '/dist/plugins'
        },
            ),*/


     /*  new HtmlWebpackPlugin({template: "src/webapp/index.html",
            filename:"index.html",
            chunks:['index' ]
        } )*/
    ],
    devServer:{
        contentBase: path.join(__dirname,"/dist"),
        compress:true,
        port:7070/*,
        host:'127.0.0.1',
        proxy:{  //代理
            "/loginController":{
                target:target,
                changeOrigin:true
            }
        }*/
    }
}



//entries函数
var entries= function () {
    var jsDir = path.join(__dirname,"/src/webapp/")
    var entryFiles = glob.sync(jsDir + '/**/*.{js,jsx}')
    for (var i = 0; i < entryFiles.length; i++) {
        var filePath = entryFiles[i];
        var fpath = filePath.substring(filePath.lastIndexOf('\/webapp\/') + 1, filePath.lastIndexOf('.')).replace("webapp/","");
        var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
        config.entry[filename]=__dirname + "/src/webapp/"+fpath;
        config.plugins.push(
            new HtmlWebpackPlugin( {
                template: "src/webapp/"+fpath+".html",
                filename:fpath+".html",
                chunks:[filename]
            } )
        )
    }
}
entries(); //批量添加
module.exports = config