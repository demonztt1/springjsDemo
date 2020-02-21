import index from './eindex.html'

import { render } from 'react-dom';
import React, { Component } from 'react';
import 'antd/dist/antd.css';


import { Card, Icon, Avatar ,Col ,Row  ,Dropdown ,Menu } from 'antd';
import saveAs from "jszip/vendor/FileSaver";
import JSZip from "jszip";

const { Meta } = Card;

const menu = (
    <Menu>
        <Menu.Item key="1">1st menu item</Menu.Item>
        <Menu.Item key="2">2nd menu item</Menu.Item>
        <Menu.Item key="3">3rd menu item</Menu.Item>
    </Menu>
);

class Goods extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            goods:[1,2,3],
            data:[]
        };
        //this.findInit();
    }
    ajax =(url)=>{
        let res = new Promise(function(resolve, reject) {

            var xhr = new XMLHttpRequest();//创建新的XHR对象
            xhr.open('GET', url);//指定获取数据的方式和url地址
            let blob;
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;");
            xhr.responseType = 'blob';//以blob的形式接收数据，一般文件内容比较大
            xhr.onload = function (e) {
                resolve(this.response)      ;//Blob数据

            };
            xhr.send(); //post请求传的参数
        })
        return res
    }



    finddata(){
        var zip = new JSZip();
        let url='/static/imgzip/goods.zip'
        return   new Promise(reswww => {
            this.ajax(url).then(function (blob) {
                return JSZip.loadAsync(blob)
            }).then(function (zipu) {
                //获取配置文件相当与入口文件
                zipu.file('qguan.config').async("string")
                    .then(function (w) {
                        let ress=new Array()
                        let tu={};
                        let lint = w.split(/[\r\n]/);
                        lint.forEach((e) => {
                            let date = e.split(',');
                            if (date[3] == 'logo') {
                                let res = new Promise(resolve => {
                                    zipu.file(date[0]).async("base64")
                                        .then(function (w) {
                                            tu.logo = 'data:image/png;base64,'+w;
                                            resolve("")
                                        });
                                })
                                ress.push(res);
                            }
                            if (date[3] == 'main') {
                                let res = new Promise(resolve => {
                                    zipu.file(date[0]).async("base64")
                                        .then(function (w) {
                                            tu.main ='data:image/png;base64,'+ w;
                                            resolve("")
                                        });
                                })
                                ress.push(res);
                            }
                            if (date[3] == 'description') {
                                tu.description = date[0];
                            }
                            if (date[3] == 'title') {
                                tu.title = date[0];
                            }

                        })

                        Promise.all(ress).then(() => {
                            reswww(tu)
                        })
                    })
            })
        })
    }

    findInit(){
        for(var i = 0; i <  this.state.goods.length; i++) {
            let ssss= this.finddata();
            ssss.then((tu) => {
                let data =this.state.data;
                this.setState({ data:[...data,tu] });
            })
        }
    }



    clickA=(e,key,name,url,)=>{
        e.stopPropagation();
            let daata={key:14,pid:0,name:'生成代码',url:'/createCode/ceateList.html'}
        parent.window.addr(daata.key,daata.name,daata.url)
    }


    findGoods(){
        let res=[]
        for(var i = 0; i <  this.state.data.length; i++) {
            res.push(

                <div style={{ background: '#ffffff', padding: '20px' }}>
                    <Row gutter={16}>
                        <Col span={2} onClick={this.clickA}  >
                            <Dropdown overlay={menu} trigger={['contextMenu']}>

                                <span style={{ userSelect: 'none' }}>  <Avatar src={this.state.data[i].logo}/>
                            <br /> {this.state.data[i].title}</span>
                            </Dropdown>

                        </Col>
                    </Row>
                </div>
            )
        }

        return res;
    }

    render(){
        return (
            <div>  {  this.findGoods()}</div>
        )

    }
}
render(
    <Goods/>,
    document.getElementById("eindex")
);