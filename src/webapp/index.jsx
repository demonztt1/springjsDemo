import index from './index.html'

import boxTest from '../static/css/index.css'
import common from '../static/css/common.css'
import tabs from '../static/css/tabs.css'
import iframes from '../static/css/iframes.css'
import tree from '../static/css/tree.css'

import jquery from 'jquery'
window.$=jquery;
import React, { Component } from 'react';
//import { Button ,Menu , SubMenu }from 'antd';
import { render } from 'react-dom';

import 'antd/dist/antd.css';
//import './index.css';
import {   Icon, Switch } from 'antd';
import Menu from './common/menu/menu.jsx';

/*class Sider extends React.Component {
    constructor(props) {
        super(props);
        state = {
            mode: 'inline',
            theme: 'light',
            nodes:[ {key:11,pid:0,name:'生产代码',url:'/createCode/ceate.html'},
                {key:12,pid:0,name:'模板列表',url:'/createCode/ceateFtlList.html'},
                {key:13,pid:0,name:'字段列表',url:'/createCode/ceateFieldList.html'},
                {key:14,pid:0,name:'生成代码',url:'/createCode/ceateList.html'},
                {key:15,pid:0,name:'qguan',url:'/react/qguan/reactEasyuiTest.html'},
                {key:16,pid:0,name:'张三1',url:''},
                {key:17,pid:16,name:'张三11'},
                {key:18,pid:0,name:'张三1',url:''},
                {key:19,pid:18,name:'张三11'}

            ]
        };


        this.handleClick=this.handleClick.bind(this)
    }



    changeMode = value => {
        this.setState({
            mode: value ? 'vertical' : 'inline',
        });
    };

    changeTheme = value => {
        this.setState({
            theme: value ? 'dark' : 'light',
        });
    };

    render() {
    this.toTow();
        return (
            <ul>
                { this.ftTree (0)}

            </ul>
        );
    }

    handleClick = e => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    };

    onOpenChange = openKeys => {
        debugger;
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    };
    ifr(w){
         if (this.state.nodes[w].r != null) {
           return this.ftTree(this.state.nodes[w].r);
        }
    }

    resr(w){

    }


    ftTree (w) {
        if (this.state.nodes[w].l == null) {
                return(
                    <div>
                        <div key={this.state.nodes[w].key}>
                            <span
                                href={`javascript:window.addr("${this.state.nodes[w].key}","${this.state.nodes[w].name}",
                        "${this.state.nodes[w].url}")`}
                            ><i class="fa fa-plus-circle"></i>{this.state.nodes[w].name}</span>
                        </div>

                        {   this.ifr(w)}
                    </div>
            )
        } else {
            return(
                <div
                    onClick={this.handleClick}>

                    <div  key={this.state.nodes[w].key}>
                         <span>
                            <Icon type="setting" />
                            <span>{this.state.nodes[w].name}</span>
                          </span>

                        { this.ftTree(this.state.nodes[w].l) }

                    </div  >
                      {this.ifr(w)}
                </div>
            )
        }
        return;
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
}*/


 render(<Menu />, left);

// 加载组件到 DOM 元素 mountNode
//render(<App name="root" />, menu);



/*
$(document).ready(function() {
    //每个有子菜单的菜单项添加点击事件
    $(".tree .fa").click(function(){
        //获取当前菜单旁边input的check状态
        var isChecked = $(this).hasClass("fa-plus-circle")
        //展开和收齐的不同状态下更换右侧小图标
        if(isChecked){
            $(this).addClass("fa-minus-circle").removeClass("fa-plus-circle");
            $(this).parent().parent() .children("ul").show()
        }else{
            $(this).addClass("fa-plus-circle").removeClass("fa-minus-circle");
            $(this).parent().parent().children("ul").hide();
        }
    });

});*/
