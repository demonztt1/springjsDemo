import userList  from './userRoleEdit.html'


import { Modal,Table, Input, InputNumber, Popconfirm, Form ,Button, Icon, Switch,Menu ,DatePicker} from 'antd';
import moment from 'moment';
import { render } from 'react-dom';
import React, { Component } from 'react';

import 'antd/dist/antd.css';

import instance from '../../../static/utils/axios.config.js'
import ContextMenu from '../../../static/react/ContextMenu.jsx';

import SeniorModal from '../../../static/react/SeniorModal.jsx';
import listToTree from "../../../static/js/tree/listToTree";

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


const EditableContext = React.createContext();

class EditableCell extends React.Component {
    getInput = () => {
        if (this.props.inputType === 'number') {
            return <InputNumber />;
        }
        return <Input />;
    };

    fingdCell=(children,inputType)=>{
        if("date"==inputType){
            if(children[2]){
                return  moment(new Date(children[2] )).format('YYYY MM DD  HH:mm:ss');
            }

            return "" ;
        }else {
            return children
        }

    }

    renderCell = ({ getFieldDecorator }) => {


        const {
            editing,
            dataIndex,
            title,
            inputType,
            record,
            index,
            children,
            ...restProps
        } = this.props;
        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item style={{ margin: 0 }}>
                        {getFieldDecorator(dataIndex, {
                            rules: [
                                {
                                    required: true,
                                    message: `Please Input ${title}!`,
                                },
                            ],
                            initialValue: record[dataIndex],
                        })(this.getInput())}
                    </Form.Item>
                ) : (
                    this.fingdCell(children,inputType)
                )}
            </td>
        );
    };

    render() {
        return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
    }
}


class EditableTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedRowKeys: [],
            data:[], editingKey: ''
            ,  event:{},visible:false,
            winVisible:false,
            pid:"",
            id:""

        };
        this.columns = [
            {dataIndex:'id',title:'id',width:120,                    editable: true},
            {dataIndex:'username',title:'名称',width:120,                    editable: true},
            {dataIndex:'url',title:'连接',width:120,                    editable: true},
            {dataIndex:'createTime',title:'创建时间',width:120,     inputType:"date",               editable: true}
        ];

        this.del= this.del.bind(this)
    }
    /**
     * 初始化数据
     */
    componentDidMount = () => {
        let _this=this;


        window.receiveMessageFromIndex = function ( event ) {
            if(event!=undefined){
                if(event.data.userId ){
                    let userId=event.data.userId
                    _this.setState({
                        userId //2.给变量赋值
                    })
                }
                if(event.data.id ){
                   let orgId=event.data.id
                    _this.setState({
                        orgId //2.给变量赋值
                    })
                }

                _this.findData();

            }
        }
        //监听message事件
        window.addEventListener("message", receiveMessageFromIndex, false);

    }
    componentWillUnmount = () => {
        this.setState = (state,callback)=>{
            return;
        };
    }
    /*获取子组件传递过来的值*/
    changeStatus = (status) =>{
        this.setState({
            visible:status
        })
    }


    ok = e =>{
        let _this=this;
        let {userId,orgId ,selectedRowKeys}=_this.state;
        let roleIds=selectedRowKeys;
        let params = {roleIds,orgId,userId}
        instance.post('/org/roleSave',params)
            .then((resdata) => {
                top.close(1);
            })
            .catch(error => {
                alert('请求失败');
            })
    }
    //关闭页面
    close =()=>{
        top.close();
    }

    handleOk = e => {

        console.table("窗口关闭" +e)
        this.setState({
            winVisible: false,
        });
    };

    findMenu(){
        let _this=this;
        return (<Menu>
            <Menu.Item key="4" onClick={_this.addSun.bind(_this)}>
                <a target="_blank" rel="noopener noreferrer" >
                    添加子菜单
                </a>
            </Menu.Item>
            <Menu.Item key="0" onClick={()=>{
                debugger;
                _this.del.bind(_this)}}>
                <a target="_blank" rel="noopener noreferrer"       >
                    删除
                </a>
            </Menu.Item>
            <Menu.Item key="1"   >
                <a target="_blank"   onClick={    _this.del}   rel="noopener noreferrer">
                    编辑
                </a>
            </Menu.Item>
            <Menu.Item key="6" disabled>
                重置密码
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="3" disabled>
                详细信息
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="5" disabled>
                权限信息
            </Menu.Item>
        </Menu>)
    }
    menu= (event,record) =>{
        this.setState({
            event:event,
            visible: true,
            index:record
        })
    }

    /**
     * 获取数据
     */
    findData(){
        let _this=this;
        let {userId,orgId}=_this.state;
        let params = {userId,orgId}
        instance.post('/org/roleList',params) .then((resdata) => {
            for (let i=0;i<resdata.length;i++){
                resdata[i].key=resdata[i].id;
                resdata[i].title=resdata[i].name;
                resdata[i].value=resdata[i].id;
            }
            let data=new listToTree(resdata).totree();
            _this.setState({
                data
            });

        }).catch(error => {
            alert('请求失败');
        });

    }




    //添加子菜单
    addSun(){
        let _this=this;
        const reds = this.state.index;
        _this.setState({
            winVisible:true,
            pid:reds.id
        })
    }



    isEditing = record => record.key === this.state.editingKey;

    cancel = () => {
        this.setState({ editingKey: '' });
    };


    del(){
        alert('请求失败');
        debugger;
        const selectedRowKeys = this.state.index;
        let _this=this;
        let params = {
            id: selectedRowKeys.id
        };
        instance.post('/user/del',params) .then((resdata) => {
            _this.findData();

        }).catch(error => {
            alert('请求失败');
        });

    }


    edit =()=>{
        let _this=this;
        let  selectedRowKeys= this.state.index;
        let id = selectedRowKeys.id;
        _this.setState({
            winVisible:true,
            id:selectedRowKeys.id
        })
    }

    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };



    render() {
        let _this=this;
        const {  selectedRowKeys } = this.state;

        const components = {
            body: {
                cell: EditableCell,
            },
        };
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };

        const columns = this.columns.map(col => {
                /*  if (!col.editable) {
                      return col;
                  }*/
                return {
                    ...col,
                    onCell: record => ({
                        record,
                        inputType: col.inputType   ? col.inputType: 'text',
                        dataIndex: col.dataIndex,
                        title: col.title,
                        editing: this.isEditing(record),
                    }),
                };
            })
        ;

        return (
            <EditableContext.Provider value={_this.props.form}>
                <Button type="primary"  onClick={this.ok} className="login-form-button">
                    保存
                </Button>
                <Button type="primary"  onClick={this.close} className="login-form-button">
                    关闭
                </Button>
                <ContextMenu uevent={_this.state.event}
                             status={_this.changeStatus}
                             vuale={_this.findMenu()}
                             del={_this.del}
                             index={_this.index}
                             visible={_this.state.visible}>


                </ContextMenu>
                <SeniorModal style={dialogDiv}  popup="true"
                             title="编辑菜单"
                             width='500'
                             visible={_this.state.winVisible}
                             onOk={_this.handleOk}
                             onCancel={_this.handleCancel}
                             paramObj={{id:_this.state.id}}
                             src={"/system/user/userEdit.html" }
                >

                </SeniorModal>


                <Table
                    rowSelection={rowSelection}
                    components={components}
                    bordered
                    dataSource={_this.state.data}
                    columns={columns}
                    rowClassName="editable-row"
                    pagination={{
                        onChange: _this.cancel,
                    }}
                    onRow={(record, index) => {
                        return {
                            onContextMenu: event => {
                                _this.menu(event ,record)
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
