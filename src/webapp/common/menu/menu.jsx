import menu from './menu.html'
import  menucss from './menu.css'

import React, { Component } from 'react';
import { render } from 'react-dom';

export  default class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 'inline',
            theme: 'light',
            nodes:[ {key:11,pid:0,name:'生产代码',url:'/createCode/ceate.html'},
                {key:12,pid:0,name:'模板列表',url:'/createCode/ceateFtlList.html'},
                {key:13,pid:0,name:'字段列表',url:'/createCode/ceateFieldList.html'},
                {key:14,pid:0,name:'生成代码',url:'/createCode/ceateList.html'},
                {key:16,pid:0,name:'商城',url:'',isOpen:true},
                {key:17,pid:16,name:'商品',url:'/shop/goods.html'},
                {key:18,pid:0,name:'张三1',url:'',isOpen:true},
                {key:19,pid:18,name:'张三11'},
                {key:20,pid:18,name:'张三11'},
                {key:21,pid:18,name:'张三11',isOpen:true},
                {key:22,pid:21,name:'张三11'},
                {key:15,pid:0,name:'qguan',url:'/react/qguan/reactEasyuiTest.html'},
                {key:36,pid:0,name:'张三3',url:''},
                {key:37,pid:36,name:'张三33'},
                {key:38,pid:0,name:'张三3',url:'',isOpen:true},
                {key:39,pid:38,name:'张三33'},
                {key:40,pid:0,name:'工作流'},
                {key:41,pid:40,name:'模型',url:'/activiti/modelList.html'},
                {key:42,pid:40,name:'接口',url:'/activiti/actApiList.html'},
                {key:42,pid:40,name:'表单',url:'/activiti/actApiHtmlList.html'}

            ]
        };


        this.handleClick=this.handleClick.bind(this)
    }



    render() {
        this.toTow();
        return (
            <div class="menu">
                { this.ftTree (0)}
            </div>
        );
    }

    handleClick = (e,key) => {
        e.stopPropagation();
        for(let i=0;i<this.state.nodes.length;i++){
            if (this.state.nodes[i].key===key){
                if(this.state.nodes[i].isOpen==true){
                    this.state.nodes[i].isOpen=false
                }else {
                    this.state.nodes[i].isOpen=true
                }
                break
            }
        }
        this.setState({
            nodes:this.state.nodes
        })
    };

    clickSpan=(e,url)=>{
        e.stopPropagation();
        console.log("span")
    }

    clickA=(e,key,name,url,)=>{
        e.stopPropagation();
        window.addr(key,name,url)
    }

    ftTree (w) {
        if (this.state.nodes[w].l == null) {
            let s=  <div  key={this.state.nodes[w].key} class="liMenu">
                        <span
                            onClick={(e)=>{this.clickA(e,this.state.nodes[w].key,
                                this.state.nodes[w].name,this.state.nodes[w].url)}}
                        ><a >{this.state.nodes[w].name}</a></span>

            </div>
            let list = [];
            list.push(s)
            if (this.state.nodes[w].r != null) {
                let resli=this.ftTree(this.state.nodes[w].r);
                list.push(...resli)
            }
            return list
        } else {
            let s=<div  className={`liMenu ${true == this.state.nodes[w].isOpen ?  'menu-minus':'menu-plus' }`}
                        key={this.state.nodes[w].key}
                    onClick={(e)=>{this.handleClick(e,this.state.nodes[w].key)}}
            >
                <span>{this.state.nodes[w].name}</span>
                <div class="menuSub ">
                    { this.ftTree(this.state.nodes[w].l) }
                </div>
            </div>
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

/*
render(<Menu />,  document.getElementById("menu"));*/
