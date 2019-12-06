import modelList  from './modelList.html'
import { Modal,Table, Input, InputNumber, Popconfirm, Form ,Button, Icon, Switch,Menu} from 'antd';
import { render } from 'react-dom';
import jquery from 'jquery'
import React, { Component } from 'react';
import ContextMenu from '../../static/react/ContextMenu.jsx';

import SeniorModal from '../../static/react/SeniorModal.jsx';
import 'antd/dist/antd.css';
const { SubMenu } = Menu;

const dialogIframe = {
    top :20,
    width: 780,
    padding:0,
    frameborder:"no"  ,border:"0", marginwidth:"0" ,marginheight:"0" , allowtransparency:"yes"
};
const dialogDiv={
    top :20,
    width: "780",
    height: "780",
    padding:0
}
class Dialog extends React.Component {
    state = { visible: false,  padding:0 };

    showModal = () => {
        let _this=this;
        $.ajax({
            async : false,
            cache : false,
            type : 'get',
            url : "/models/newModel",
            dataType : "html",
            error : function() {
                alert('请求失败');
            },
            success : function(data) {
                let json=JSON.parse(data);
               /* _this.setState({
                    visible: true,
                    modelId:json.modelId
                });*/
                window.open ("/static/activiti/modeler.html?modelId="+json.data.modelId)

            }
        });

    };

    handleOk = e => {
        this.setState({
            visible: false,
        });
    };


    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <div>
                <Button type="primary" onClick={this.showModal} style={{ textAlign: 'right' }}>
                    新增
                </Button>
                <SeniorModal style={dialogDiv}  popup="true"
                    title="生成代码"
                             width='800'
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                             src={"/static/activiti/modeler.html?modelId="+this.modelId}
                >

                </SeniorModal>
            </div>
        );
    }
}

const EditableContext = React.createContext();


class EditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data:[], editingKey: ''
        ,  event:{},visible:false
        };
        this.columns = [
            {dataIndex:'id',title:'id',width:120,                    editable: true},
            {dataIndex:'revision',title:'版本',width:80,align:'right',    editable: true},
            {dataIndex:'name',title:'名称',width:120,                    editable: true},
            {dataIndex:'key1',title:'标签',width:120,                    editable: true},
            {dataIndex:'metaInfo',title:'元信息',width:120,                    editable: true},
            {dataIndex:'deploymentId',title:'部署ID',width:120,                    editable: true},
            {dataIndex:'createTime',title:'创建时间',width:120,                    editable: true},

        ];
    }


    findMenu(){
        return (<Menu>
            <Menu.Item key="0" onClick={this.del.bind(this)}>
                <a target="_blank" rel="noopener noreferrer" >
                    删除
                </a>
            </Menu.Item>
            <Menu.Item key="1"  onClick={this.edit.bind(this)} >
                <a target="_blank" rel="noopener noreferrer">
                    编辑
                </a>
            </Menu.Item>
            <Menu.Item key="2" onClick={this.deploy.bind(this)}>
                <a target="_blank" rel="noopener noreferrer" >
                    部署
                </a>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="3" disabled>
                查看信息
            </Menu.Item>
        </Menu>)
    }
    menu= (event,index) =>{
        this.setState({event:event,
            visible: true,index:index})
    }


    isEditing = record => record.key === this.state.editingKey;

    cancel = () => {
        this.setState({ editingKey: '' });
    };

    save(form, key) {
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            const newData = [...this.state.data];
            const index = newData.findIndex(item => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                this.setState({ data: newData, editingKey: '' });
            } else {
                newData.push(row);
                this.setState({ data: newData, editingKey: '' });
            }
        });
    }

    edit =()=>{
        let  selectedRowKeys= this.state.index;
        let id = this.state.data[selectedRowKeys].id;
        window.open ("/static/activiti/modeler.html?modelId="+id)
    }


    deploy =()=>{
        let  selectedRowKeys= this.state.index;
        let id = this.state.data[selectedRowKeys].id

        let  url =  '/models/deploy/'+id;

        $.ajax({
            async : false,
            cache : false,
            type : 'post',
            url : url,
            dataType : "html"
        }).then( (data) => {
            alert('发布成功');
        })
            .catch(error => {
                alert('请求失败');
            });;
    }
    /**
     * 初始化数据
     */
    componentDidMount = () => {
        let _this=this;
        $.ajax({
            async : false,
            cache : false,
            type : 'get',
            url : "/models/getAll",
            dataType : "html"
        }).then( (data) => {
            let json=JSON.parse(data);
            let models=json.data.models;
             for(let i=0;i<models.length;i++){
                 models[i].key1= models[i].key;
               models[i].key= models[i].id;;
             }
            _this.setState({
                data: models
            });
            })
            .catch(error => {
                alert('请求失败');
            });

    }
    componentWillUnmount = () => {
        this.setState = (state,callback)=>{
            return;
        };
    }

    del(){
        const selectedRowKeys = this.state.index;
        let dataSource = this.state.data;
        dataSource.splice(Number.parseInt(selectedRowKeys), 1);
        this.setState({
            data: dataSource,
            index: []
        })
    }
    /*获取子组件传递过来的值*/

    changeStatus = (status) =>{
        this.setState({
            visible:status
        })
    }

    render() {
        return (
            <EditableContext.Provider value={this.props.form}>
                <ContextMenu uevent={this.state.event}
                                             status={this.changeStatus}
                                             vuale={this.findMenu()}
                                             del={this.del}
                                             index={this.index}
                                             visible={this.state.visible}>


            </ContextMenu>
                <Table
                 //  components={components}
                    bordered
                    dataSource={this.state.data}
                    columns={this.columns}
                    rowClassName="editable-row"
                    pagination={{
                        onChange: this.cancel,
                    }}
                    onRow={(record, index) => {
                        return {
                            onContextMenu: event => {
                                this.menu(event ,index)
                            },
                        };
                    }}
                />
            </EditableContext.Provider>
        );
    }
}


const EditableFormTable = Form.create()(EditableTable);

render(<EditableFormTable />, root);
render(<Dialog />, search);