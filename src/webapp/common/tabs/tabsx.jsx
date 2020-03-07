import { Tabs,ButtonGroup,Button ,Dropdown,Menu} from 'antd';
import React, { Component } from 'react';
import TotalMenu from '../../../static/react/TotalMenu.jsx';
import { render } from 'react-dom';
import 'antd/dist/antd.css';
import SeniorModal from '../../../static/react/SeniorModal.jsx';
import tokenUtils from '../../../static/utils/tokenUtils.js'
const { TabPane } = Tabs;
var addr;
window.addr=addr;
const dialogDiv={
    top :20,
    width: "400",
    height: "600",
    padding:0
}

class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.newTabIndex = 0;
        const panes = [
            { title: '首页', content: '首页',closable: false, key: '首页',url:'eindex.html' }
        ];
        this.state = {
            activeKey: panes[0].key,
            panes,
            loginLisible:false,
            reMenu:false,
            reRole:false
        };
       window.addr=this.add;
        parent.window.addr=window.addr;
    }

    onChange = activeKey => {
        this.setState({ activeKey });
    };

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    };

    add = (activeKey,name,url) => {
        activeKey=activeKey.toString()
        const { panes } = this.state;
        for(let i=0;i<panes.length;i++) {
            if (panes[i].key == activeKey) {
                this.setState({activeKey});
                return;
            }
        }
        panes.push({ title:name, content: 'Content of new Tab', key: activeKey ,url:url});
        this.setState({ panes, activeKey })
    };
    remove = targetKey => {
        let { activeKey } = this.state;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (panes.length && activeKey === targetKey) {
            if (lastIndex >= 0) {
                activeKey = panes[lastIndex].key;
            } else {
                activeKey = panes[0].key;
            }
        }
        this.setState({ panes, activeKey });
    };


    //登录窗口 登录成功
    handleOk = e => {
        console.log("登录成功")
        this.setState({
            reRole:true,
            loginVisible: false,
        });
    };

    //取消登录窗口
    handleCancel = e => {

        this.setState({
            loginVisible: false,
        });
    };

    login(){
            this.setState({
                loginVisible:true
            })
    }

    outin(){
        tokenUtils.del();
    }


    findLoginMenu(){
        return   <Menu>
            <Menu.Item onClick={this.login.bind(this)} >
                <a   >
                    登录
                </a>
            </Menu.Item>
            <Menu.Item onClick={this.outin.bind(this)} >
                <a  >
                    注销
                </a>
            </Menu.Item>
        </Menu>
            }
    buttonMenu(){
        let res =new Array();
        res.push(
            <Dropdown key='1' overlay={ <TotalMenu

                url='/sysMenu/list'
                refresh ={this.state.reMenu}
            /> }  >
                <Button>菜单</Button>
            </Dropdown>
        )
        res.push(    <Dropdown key='2' overlay={<TotalMenu
            url='/power/list'
            refresh ={this.state.reRole}
            /> } >
                <Button>角色</Button>
            </Dropdown>
        )
        res.push(    <Dropdown key='3' overlay={  this.findLoginMenu() } >
                <Button>登录</Button>
            </Dropdown>
        )
        return res;
    }


    render() {
        let  button=this.buttonMenu();
        return (
            <div>
                <SeniorModal style={dialogDiv}  popup="true"
                             title="登录"
                             width='400px'
                             visible={this.state.loginVisible}
                             onOk={this.handleOk}
                             onCancel={this.handleCancel}
                             src={"/system/login/login.html" }
                >

                </SeniorModal>
                <Tabs tabBarExtraContent={button}
                    style={  {border:'1px solid #D2D8DE'}}
                    onChange={this.onChange}
                    activeKey={this.state.activeKey}
                    type="editable-card"
                    onEdit={this.onEdit}
                    hideAdd={true}>
                    {this.state.panes.map(pane => (
                                        <TabPane tab={pane.title} key={pane.key} closable={pane.closable}  >
                                                <iframe src= {pane.url}
                                                        width="100%" height="700" frameBorder="no" border="0" marginWidth="0"
                                                        marginHeight="0" allowtransparency="yes"></iframe>
                                        </TabPane>
                                    )
                            )
                    }
                </Tabs>
            </div>
        );
    }
}

 render(<Demo />,  document.getElementById("page") );