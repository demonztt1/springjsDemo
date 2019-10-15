import { Tabs,ButtonGroup,Button ,Dropdown,Menu ,Row ,Card,Col,Tree,Avatar
    ,Breadcrumb } from 'antd';
import React, { Component } from 'react';
import { render } from 'react-dom';
import 'antd/dist/antd.css';
import  axios from  'axios';
const { TreeNode } = Tree;

const menu = (
    <Menu>
        <Menu.Item key="1">1st menu item</Menu.Item>
        <Menu.Item key="2">2nd menu item</Menu.Item>
        <Menu.Item key="3">3rd menu item</Menu.Item>
    </Menu>
);
let count = 0;
export  default class ResourceManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index:2,
            mode: 'inline',
            theme: 'light',
            nodes:[ {key:1,pid:0,name:'我的电脑',url:'/createCode/ceate.html'}],
            paths:['我的电脑'],
            dirs:[]
        };
        this.findRootDir1();
    }

    /**
     * 异步加载目录
     * @param treeNode
     */
    onLoadData = treeNode =>{
        this.findRootDir()

    }

    onSelect= treeNode =>{
        this.findRootDir1()

    }
    findRootDir1(){
        const _this=this;    //先存一下this，以防使用箭头函数this会指向我们不希望它所指向的对象。
        axios({
            url: 'http://127.0.0.1:8080/dir/findRootDir',
            method:'post',
            data:JSON.stringify({"name":"10000" ,
                "pwd":"123456"
            })
        }).then(function (response) {
            let   paths=['我的电脑']
            _this.setState({
                paths,
                dirs: response.data
            });
        })
            .catch(function (error) {
                console.log("catch  "+error);
                _this.setState({
                    isLoaded:false,
                    error:error
                })
            })
    }
    findRootDir(){
        const _this=this;    //先存一下this，以防使用箭头函数this会指向我们不希望它所指向的对象。
        axios({
            url: 'http://127.0.0.1:8080/dir/findRootDir',
            method:'post',
            data:JSON.stringify({"name":"10000" ,
                "pwd":"123456"
            })
        })
            .then(function (response) {
                let {index,nodes} =_this.state;
                console.log(response.data)
                let data= response.data ;
                data .forEach(path=>{
                    nodes.push({pid:1,key:index,isDir:1,name:path});
                    index=index+1
                });
                _this.setState({
                    index,
                    nodes
                });
            })
            .catch(function (error) {
                console.log("catch  "+error);
                _this.setState({
                    isLoaded:false,
                    error:error
                })
            })
    }

    findDir=(name)=>{
        const _this=this;    //先存一下this，以防使用箭头函数this会指向我们不希望它所指向的对象。
        let paths= _this.state.paths ;
        let id=paths.length;

        let path="";

        if(id >1){
            for(let i=1;i<paths.length;i++){
                path=path+paths[i]+ '/'
            }
            path =path+name
        }else   {
            path=name +'//'
        }


        axios({
            url: 'http://127.0.0.1:8080/dir/findDir',
            method:'post',
            data:JSON.stringify({"id":id ,
                "dir":path
            })
        }).then(function (response) {

            let spaths=_this.state.paths;
            spaths.push(name)
            _this.setState({
                paths:spaths ,
                dirs: response.data
            });
        })
            .catch(function (error) {
                console.log("catch  "+error);
                _this.setState({
                    isLoaded:false,
                    error:error
                })
            })
    }



    /**
     * 窗口单机
     * @param e
     * @param key
     * @param name
     * @param url
     */
    winClick=(e,key,name,url,)=>{
        e.stopPropagation();
        count += 1;
        let _this =this;
        setTimeout(() => {
            if (count === 1) {
                //在本窗口打开文件
                //打开新窗口
                if(1!=1){

                    let daata={key:14,pid:0,name:'生成代码',url:'/createCode/ceateList.html'}
                    parent.window.addr(daata.key,daata.name,daata.url)
                }else {
                    let dirs=_this.state.dirs
                    for(let i=0;i<dirs.length;i++){
                        dirs[i].isSelected=false;
                    }
                    dirs[key].isSelected=true;
                    _this.setState({dirs})
                }
            } else if (count === 2) {
                // 在本窗口打开文件  双击
                this.findDir(name)
            }
            count = 0;
        }, 300);

    }


    ftTree (w) {
        if (this.state.nodes[w].l == null) {
            let s=  <TreeNode  key={this.state.nodes[w].key}  title={this.state.nodes[w].name} >  {this.state.nodes[w].name} </TreeNode >
            let list = [];
            list.push(s)
            if (this.state.nodes[w].r != null) {
                let resli=this.ftTree(this.state.nodes[w].r);
                list.push(...resli)
            }
            return list
        } else {
            let s=<TreeNode    title={this.state.nodes[w].name} >
                { this.ftTree(this.state.nodes[w].l) }
            </TreeNode>
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



    /**
     * 获取当前文件的路径
     * @returns {*}
     */
    findBread(){
        let listItems ;
        if(this.state.paths.length==0){
            listItems =   <Breadcrumb.Item>{'我的电脑'}</Breadcrumb.Item>
        }else {
            listItems = this.state.paths.map((path) =>
                // 又对啦！key应该在数组的上下文中被指定
                <Breadcrumb.Item>{path}</Breadcrumb.Item>
            );
        }
        return(
            <Breadcrumb>
                {listItems}
            </Breadcrumb>
        )
    }

    /**
     * 刷新窗口页面
     * @returns {Array}
     */
    findWins(){
        let res=[]

        for(let i = 0; i <  this.state.dirs.length; i++) {
            let name=this.state.dirs[i].name;
            let index=i;
            let isSelected={};

            if(this.state.dirs[i].isSelected==true){
                isSelected={ background: '#1890ff'}
            }
            res.push(

                <div style={{ background: '#ffffff', padding: '20px' }} key={i}>
                    <Row gutter={16}>
                        <Col span={2}   style={ isSelected} onClick={ (ev) => {this.winClick(ev,index,name) }}    >
                            <Dropdown overlay={menu} trigger={['contextMenu']}>

                                <span style={{ userSelect: 'none' }}>  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
                            <br />  {name}</span>
                            </Dropdown>

                        </Col>
                    </Row>
                </div>
            )
        }

        return res;

    }

    render(){
        this.toTow();
        let menu=this.ftTree (0);
        return (
            <div style={{ background: '#ECECEC', padding: '30px' }}>
                <Row gutter={16}>
                    <Col span={8}>
                        <Card title="资源管理" bordered={false}>
                            <Tree
                                loadData={this.onLoadData}
                                onSelect = {this.onSelect}
                                className="draggable-tree"
                                /*      defaultExpandedKeys={this.state.expandedKeys}*/
                                draggable
                                blockNode
                            >
                                {menu}
                            </Tree>
                        </Card>
                    </Col>
                    <Col span={16}>
                        <Card title={this.findBread()} bordered={false}>
                            {this.findWins()}
                        </Card>
                    </Col>
                </Row>
            </div>
        )

    }
}