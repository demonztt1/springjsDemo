import React, { Component } from 'react';
import { render } from 'react-dom';
import { Button ,Menu }from 'antd';
import 'antd/dist/antd.css';
const { SubMenu } = Menu;
import axios from 'axios';
/**
 * {key:11,pid:0,name:'生产代码',url:'/createCode/ceate.html'},
 {key:12,pid:0,name:'模板列表',url:'/createCode/ceateFtlList.html'},
 {key:13,pid:0,name:'字段列表',url:'/createCode/ceateFieldList.html'},
 {key:14,pid:0,name:'生成代码',url:'/createCode/ceateList.html'},
 {key:16,pid:0,name:'商城',url:'',isOpen:true},
 {key:17,pid:16,name:'商品',url:'/shop/goods.html'},
 {key:18,pid:0,name:'张三1',url:'',isOpen:true},
 {key:19,pid:18,name:'文件夹',url:"/common/sys/dir.html"},
 {key:20,pid:18,name:'张三11'},
 {key:21,pid:18,name:'张三11',isOpen:true},
 {key:22,pid:21,name:'张三11'},

 {key:40,pid:0,name:'张三1',url:'/common/sys/dir.html'},
 {key:15,pid:0,name:'qguan',url:'/react/qguan/reactEasyuiTest.html'},
 {key:36,pid:0,name:'张三3',url:''},
 {key:37,pid:36,name:'张三33'},
 {key:38,pid:0,name:'张三3',url:'',isOpen:true},
 {key:39,pid:38,name:'张三33'},
 */


export  default class TotalMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 'inline',
            theme: 'light',
            nodes:[


            ]
        };

    }
    //当组件输出到 DOM 后会执行 componentDidMount()
    componentDidMount(){
        const _this=this;    //先存一下this，以防使用箭头函数this会指向我们不希望它所指向的对象。
        axios.post('/sysMenu/list')
            .then(function (response) {
               let data1= response.data.data
                for(let i=0;i<data1.length;i++){
                    data1[i].key=data1[i].id
                }

                console.table(data1)
                _this.setState({
                    nodes:data1
                });
            })
            .catch(function (error) {
                console.log(error);
                _this.setState({
                    isLoaded:false,
                    error:error
                })
            })
    }


    render() {
        let menu="";
        if(this.state.nodes.length >0){
            this.toTow();
           menu =this.ftTree (0);
        }

        return (
            <Menu  onClick={this.clickA} >
                {menu}
            </Menu>
        );
    }



    clickA=({key})=>{
        for (let i=0;i<   this.state.nodes.length;i++){
            if(this.state.nodes[i].key==key){
               let node= this.state.nodes[i]
                window.addr(node.key,node.name,node.url)
                return;
            }
        }
    }

    ftTree (w) {
        if (this.state.nodes[w].l == null) {
            let s=  <Menu.Item key={this.state.nodes[w].key}>  {this.state.nodes[w].name} </Menu.Item>
            let list = [];
            list.push(s)
            if (this.state.nodes[w].r != null) {
                let resli=this.ftTree(this.state.nodes[w].r);
                list.push(...resli)
            }
            return list
        } else {
            let s=<SubMenu    title={this.state.nodes[w].name} >
                    { this.ftTree(this.state.nodes[w].l) }
                </SubMenu>
            let list = [];
            list.push(s)
            if (this.state.nodes[w].r != null) {
                let resli=this.ftTree(this.state.nodes[w].r);
                list.push(...resli)
            }
            return list
        }
    }

    toTow(){
        for (var i in this.state.nodes) {
            this.state.nodes[i].l = this.toL(this.state.nodes[i].key);  //就是获取每个对象的menu_id
            this.state.nodes[i].r = this.toR(this.state.nodes[i].pid,i);//就是获取每个对象的pid
        }
    }
    toL (key) {
        for (var i in this.state.nodes) {
            if (this.state.nodes[i].pid == key) {
                return i;
            }
        }
        return null;
    }
    toR (pId,l) {
        for (var i = l; i < this.state.nodes.length; i++) {
            if (this.state.nodes[i].pid== pId && i != l) {
                return i;
            }
        }
        return null;
    }
}
