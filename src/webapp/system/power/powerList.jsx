import modelList  from './powerList.html'
import { Modal,Table, Input, InputNumber, Popconfirm, Form ,Button, Icon, Switch,Menu ,DatePicker} from 'antd';
import moment from 'moment';
import { render } from 'react-dom';
import jquery from 'jquery'
import React, { Component } from 'react';
import ContextMenu from '../../../static/react/ContextMenu.jsx';

import SeniorModal from '../../../static/react/SeniorModal.jsx';
import listToTree from '../../../static/js/tree/listToTree.js';

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
        _this.setState({
            visible: true,
        });

    };

    handleOk = e => {

        console.table("窗口关闭" +e)
        this.setState({
            visible: false,
        });
    };


    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <div>
                <Button type="primary" onClick={this.showModal} style={{ textAlign: 'right' }}>
                    新增用户
                </Button>
                <SeniorModal style={dialogDiv}  popup="true"
                    title="新增用户"
                             width='800'
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                             src={"/common/user/userEdit.html" }
                >

                </SeniorModal>
            </div>
        );
    }
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

        this.state = { data:[], editingKey: ''
        ,  event:{},visible:false,
            winVisible:false,
            pid:"",
            id:""

        };
        this.columns = [
            {dataIndex:'id',title:'id',width:120,                    editable: true},
            {dataIndex:'name',title:'名称',width:120,                    editable: true},
            {dataIndex:'url',title:'连接',width:120,                    editable: true},
            {dataIndex:'createTime',title:'创建时间',width:120,     inputType:"date",               editable: true}
        ];
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


    handleOk = e => {

        console.table("窗口关闭" +e)
        this.setState({
            winVisible: false,
        });
    };

    findMenu(){
        return (<Menu>
            <Menu.Item key="4" onClick={this.addSun.bind(this)}>
                <a target="_blank" rel="noopener noreferrer" >
                    添加子菜单
                </a>
            </Menu.Item>
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

            <Menu.Divider />
            <Menu.Item key="3" disabled>
                查看信息
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="5" disabled>
                权限设置
            </Menu.Item>
        </Menu>)
    }
    menu= (event,record) =>{
        this.setState({event:event,
            visible: true,index:record})
    }


    isEditing = record => record.key === this.state.editingKey;

    cancel = () => {
        this.setState({ editingKey: '' });
    };



    edit =()=>{
        let _this=this;
        let  selectedRowKeys= this.state.index;
        let id = selectedRowKeys.id;

        _this.setState({
            winVisible:true,
            id:selectedRowKeys.id
        })
    }


    /**
     * 初始化数据
     */
    componentDidMount = () => {
      this.  findData()
    }
    componentWillUnmount = () => {
        this.setState = (state,callback)=>{
            return;
        };
    }

    /**
     * 获取数据
     */
    findData(){
        let _this=this;
        $.ajax({
            url : "/sysMenu/list",
            dataType: "json",
            type: 'POST',
            contentType: 'application/json',
            async: false,//同步
            headers: {
                //  token: getCookie('token')
            },
            data: JSON.stringify( { }),
        }).then( (res) => {
            let resdata=res.data;
            for (let i=0;i<resdata.length;i++){
                resdata[i].key=resdata[i].id;
                resdata[i].title=resdata[i].name;
                resdata[i].value=resdata[i].id;
            }
            let data=new listToTree(resdata).totree();
            _this.setState({
                data
            });
        })
            .catch(error => {
                alert('请求失败');
            });
    }
    del(){
        let _this=this;
        const selectedRowKeys = this.state.index;

        $.ajax({
            url : "/sysMenu/del",
            dataType: "json",
            type: 'POST',
            contentType: 'application/json',
            async: false,//同步
            headers: {
                //  token: getCookie('token')
            },
            data: JSON.stringify( {id: selectedRowKeys.id}),
        }).then( (res) => {
            _this.findData();
            })
            .catch(error => {
                alert('请求失败');
            });


    }
    /*获取子组件传递过来的值*/

    changeStatus = (status) =>{
        this.setState({
            visible:status
        })
    }

    render() {
        const components = {
            body: {
                cell: EditableCell,
            },
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
            <EditableContext.Provider value={this.props.form}>
                <ContextMenu uevent={this.state.event}
                                             status={this.changeStatus}
                                             vuale={this.findMenu()}
                                             del={this.del}
                                             index={this.index}
                                             visible={this.state.visible}>


            </ContextMenu>
                <SeniorModal style={dialogDiv}  popup="true"
                             title="编辑菜单"
                             width='500'
                             visible={this.state.winVisible}
                             onOk={this.handleOk}
                             onCancel={this.handleCancel}
                             paramObj={{pid:this.state.pid,id:this.state.id}}
                             src={"/common/user/userEdit.html" }
                >

                </SeniorModal>


                <Table
                  components={components}
                    bordered
                    dataSource={this.state.data}
                    columns={columns}
                    rowClassName="editable-row"
                    pagination={{
                        onChange: this.cancel,
                    }}
                    onRow={(record, index) => {
                        return {
                            onContextMenu: event => {
                                this.menu(event ,record)
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