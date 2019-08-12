import { Menu } from 'antd';
const  SubMenu=Menu;
const menusys = {
    'minWidth': '160px',
    'maxWidth':'160px',
    'padding': '5px',
    'margin': '2px 0 0',
    'fontSize': '16px',
    'color':'#373a3c',
    'textAlign': 'left',
    'backgroundColor': '#fff',
    'WebkitBackgroundClip': 'padding-box',
    'backgroundClip': 'padding-box',
    'border': '1px solid rgba(0,0,0,.15)',
    'borderRadius':'.25rem',
    'outline': 'none',
    'textOverflow': 'ellipsis',
    'z-index':'999'

}

import React, { Component } from 'react';
export  default class ContextMenu extends React.Component {
    constructor(props){
        super(props);
        this.state={visible:false};
        this.hideContextMenu=this.hideContextMenu;
    }

    componentDidMount=()=>{
      document.addEventListener('click', this.hideContextMenu)
    };
    componentWillUnmount() {
        // 移除事件监听
       document.removeEventListener('click', this.hideContextMenu)
    }
    hideContextMenu=(e)=>{
        let visible = false;
        this.props.status(visible);
    };
    showContextMenu=(e)=>{
        e.preventDefault();
    };
    getMousePosition=(event)=> {
        const x = event.clientX || (event.touches && event.touches[0].pageX),
            y = event.clientY || (event.touches && event.touches[0].pageY);
        let scrollX = document.documentElement.scrollTop,
            scrollY = document.documentElement.scrollLeft,
            { innerWidth, innerHeight } = window,
            //   rect = this.dom.getBoundingClientRect(),
            menuStyles = {
                top: y + scrollY,
                left: x + scrollX
            };
        menuStyles.position="fixed";
        return menuStyles;

    };
    render=()=> {
        let menuStyles={}
        const { visible, uevent} = this.props;
        if(visible){
            this.showContextMenu(event)
            menuStyles =this.getMousePosition(event)
        }
        Object.assign(menuStyles, menusys);
        return (
            <Menu  style={menuStyles} visible={visible}>
                {this.props.vuale}
            </Menu>
       ) ;
    }
}
