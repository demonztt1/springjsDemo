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
import { Menu, Icon, Switch } from 'antd';

const { SubMenu } = Menu;

class Sider extends React.Component {
    state = {
        mode: 'inline',
        theme: 'light',
        nodes:[ {key:1,pid:0,name:'生产代码',url:'/createCode/ceate.html'},
                    {key:2,pid:0,name:'模板列表',url:'/createCode/ceateFtlList.html'},
                    {key:3,pid:0,name:'字段列表',url:'/createCode/ceateFieldList.html'},
                    {key:4,pid:0,name:'生成代码',url:'/createCode/ceateList.html'},
                    {key:5,pid:0,name:'qguan',url:'/react/qguan/reactEasyuiTest.html'},
                    {key:6,pid:0,name:'张三1',url:''},
                    {key:7,pid:6,name:'张三11'}

]
    };

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
    console.log(this.state.nodes)
        return (
            <div>
                <Menu
                    style={{ width: 200 },{border:'1px solid #D2D8DE'}}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode={this.state.mode}
                    theme={this.state.theme}
                >
                    <Menu.Item key="2">
                        <Icon type="calendar" />
                        <span>
                        <a href="javascript:window.addr('2121','testReact','react/reactEasyuiTest.html')" >testReact</a>
                            </span>

                    </Menu.Item>
                    <Menu.Item key="4">Option 4</Menu.Item>
                    <SubMenu key="sub1-2" title="Submenu">
                        <Menu.Item key="5">Option 5</Menu.Item>
                        <Menu.Item key="6">Option 6</Menu.Item>
                    </SubMenu>
                    { this.ftTree (0)}
                </Menu>
            </div>
        );
    }
    onOpenChange = openKeys => {
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

ftTree (w) {
    if (this.state.nodes[w].l == null) {
        return(
            <Menu>
        <Menu.Item key={this.state.nodes[w].key}>
            <a href={`javascript:window.addr("${this.state.nodes[w].key}","${this.state.nodes[w].name}",
            "${this.state.nodes[w].url}")`} >{this.state.nodes[w].name}</a>
        </Menu.Item>
        { this.ifr(w) }
            </Menu>

    )
    } else {
        return(
            <Menu>
        <SubMenu
            key={this.state.nodes[w].key}
            title={
                <span>
                <Icon type="setting" />
                <span>{this.state.nodes[w].name}</span>
              </span>
            }
        >

            { this.ftTree(this.state.nodes[w].l) };
        </SubMenu>   {this.ifr(w)}

            </Menu>
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
}

 render(<Sider />, left);

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
