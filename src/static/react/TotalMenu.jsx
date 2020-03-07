import React, { Component } from 'react';
import { render } from 'react-dom';
import { Button ,Menu }from 'antd';
import 'antd/dist/antd.css';
import instance from '../utils/axios.config.js'


const { SubMenu } = Menu;
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
        const { url} = _this.props;
        instance.post(url,{l:1})
            .then(function (data1) {
                for(let i=0;i<data1.length;i++){
                    data1[i].key=data1[i].id
                }

                _this.setState({
                    nodes:data1
                });
            })
            .catch(function (error) {
                console.log("error  "+error);
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
