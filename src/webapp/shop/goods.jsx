import index from './goods.html'

import { render } from 'react-dom';
import React, { Component } from 'react';
import 'antd/dist/antd.css';

import { Card, Icon, Avatar ,Col ,Row } from 'antd';
import saveAs from "jszip/vendor/FileSaver";
import JSZip from "jszip";

const { Meta } = Card;
class Goods extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            goods:[1,2,3],
            data:[]
        };
        this.findInit();
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


    findGoods(){
        let res=[]
        for(var i = 0; i <  this.state.data.length; i++) {
            res.push(

                <div style={{ background: '#ffffff', padding: '30px' }}>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Card
                                style={{ width: 300 }}
                                cover={
                                    <img
                                        alt="example"
                                        src={this.state.data[i].main}
                                    />
                                }
                                actions={[
                                    <Icon type="setting" key="setting" />,
                                    <Icon type="edit" key="edit" />,
                                    <Icon type="ellipsis" key="ellipsis" />,
                                ]}
                            >


                                <Meta
                                    avatar={<Avatar src={this.state.data[i].logo} />}
                                    title=  {this.state.data[i].title}
                                    description={this.state.data[i].description}
                                />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card
                                style={{ width: 300 }}
                                cover={
                                    <img
                                        alt="example"
                                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                    />
                                }
                                actions={[
                                    <Icon type="setting" key="setting" />,
                                    <Icon type="edit" key="edit" />,
                                    <Icon type="ellipsis" key="ellipsis" />,
                                ]}
                            >
                                <Meta
                                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title="Card title"
                                    description="This is the description"
                                />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card
                                style={{ width: 300 }}
                                cover={
                                    <img
                                        alt="example"
                                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                    />
                                }
                                actions={[
                                    <Icon type="setting" key="setting" />,
                                    <Icon type="edit" key="edit" />,
                                    <Icon type="ellipsis" key="ellipsis" />,
                                ]}
                            >
                                <Meta
                                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title="Card title"
                                    description="This is the description"
                                />
                            </Card>
                        </Col>
                    </Row>
                </div>
            )
        }

        return res;
    }

    render(){
            return (
                <Row gutter={16}>
                    <Col span={6} />
                    <Col span={6} />
                    <Col span={6} />
                    {  this.findGoods()}
                </Row>
            )

    }
}
render(
    <Goods/>,
    document.getElementById("goods")
);