import { Tabs,ButtonGroup,Button ,Dropdown,Menu} from 'antd';
import React, { Component } from 'react';
import TotalMenu from '../../../static/react/TotalMenu.jsx';
import { render } from 'react-dom';
import 'antd/dist/antd.css';
const { TabPane } = Tabs;
var addr;
window.addr=addr;


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


    buttonMenu(){
        let res =new Array();
        res.push(
            <Dropdown overlay={ <TotalMenu/> }  >
                <Button>菜单</Button>
            </Dropdown>
        )
        res.push(    <Dropdown overlay={<TotalMenu/> } >
                <Button>角色</Button>
            </Dropdown>
        )

        return res;
    }

    render() {
        let  button=this.buttonMenu();
        return (
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
                                                    width="100%" height="700" frameborder="no" border="0" marginwidth="0"
                                                    marginheight="0" allowtransparency="yes"></iframe>
                                    </TabPane>
                                )
                        )
                }
            </Tabs>
        );
    }
}

 render(<Demo />,  document.getElementById("page") );