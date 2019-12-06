const HtmlWebpackPlugin = require('html-webpack-plugin');

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
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
            },
            {
                test: require.resolve("three/examples/js/controls/OrbitControls"),
                use: "imports-loader?THREE=three"
            },
            {
                test: require.resolve("three/examples/js/controls/OrbitControls"),
                use: "exports-loader?THREE.OrbitControls"
            },
            // 配置js/jsx语法解析
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ["@babel/preset-react", "@babel/preset-env", "mobx"]
                }
            }
        ]

    },
    plugins: [
      /*  new CleanWebpackPlugin({
            root: __dirname+'/dist/',
            verbose: true,
            cleanOnceBeforeBuildPatterns: ['**!/!*', '!static-files*'],
            dry: false
        }),*///清除旧数据
       new CopyWebpackPlugin([{  //拷贝
            from: __dirname + '/src/static',
            to:__dirname + '/dist/static'
        }]
            )/* ,*/


     /*  new HtmlWebpackPlugin({template: "src/webapp/index.html",
            filename:"index.html",
            chunks:['index' ]
        } )*/
    ],
    devServer:{
        contentBase: path.join(__dirname,"/dist"),
        compress:true,
        port:7070,
        host:'0.0.0.0',
      proxy:{  //代理
          '/models': {
              target: 'http://localhost:8080/',
              pathRewrite: {'^/models' : '/models'},
              changeOrigin: true,     // target是域名的话，需要这个参数，
              secure: false,          // 设置支持https协议的代理
          },
          '/demo': {
              target: 'http://localhost:8080/',
              pathRewrite: {'^/demo' : '/demo'},
              changeOrigin: true,     // target是域名的话，需要这个参数，
              secure: false,          // 设置支持https协议的代理
          }
          ,
          '/service': {
              target: 'http://localhost:8080/',
              pathRewrite: {'^/service' : '/service'},
              changeOrigin: true,     // target是域名的话，需要这个参数，
              secure: false,          // 设置支持https协议的代理
          }  ,
            '/sysSms': {
                target: 'http://localhost:8080/',
                    pathRewrite: {'^/sysSms' : '/sysSms'},
                changeOrigin: true,     // target是域名的话，需要这个参数，
                    secure: false,          // 设置支持https协议的代理
            },
            '/workFlow': {
                target: 'http://localhost:8080/',
                    pathRewrite: {'^/workFlow' : '/workFlow'},
                changeOrigin: true,     // target是域名的话，需要这个参数，
                    secure: false,          // 设置支持https协议的代理
            }
         }
    }
}



//entries函数
var entries= function () {
    var jsDir = path.join(__dirname,"/src/webapp/")
    var entryFiles = glob.sync(jsDir + '/**/*.{js,jsx}')
    for (var i = 0; i < entryFiles.length; i++) {
        var filePath = entryFiles[i];
        var fpath = filePath.substring(filePath.lastIndexOf('\/webapp\/') + 1).replace("webapp/","");
        var fpathb =  filePath.substring(filePath.lastIndexOf('\/webapp\/') + 1, filePath.lastIndexOf('.')).replace("webapp/","");;
        var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
        config.entry[filename]=__dirname + "/src/webapp/"+fpath;
        config.plugins.push(
            new HtmlWebpackPlugin( {
                template: "src/webapp/"+fpathb+".html",
                filename:fpathb+".html",
                chunks:[filename]
            } )
        )
    }
}
entries(); //批量添加

module.exports = config