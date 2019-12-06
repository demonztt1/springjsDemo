import html  from './actDemoList.html'
import { Modal,Table, Input, InputNumber, Popconfirm, Form ,Button, Icon, Switch,Menu} from 'antd';
import { render } from 'react-dom';
import jquery from 'jquery'
import React, { Component } from 'react';
window.$=jquery;
const { SubMenu } = Menu;
import SeniorModal from '../../../static/react/SeniorModal.jsx';
import ContextMenu from '../../../static/react/ContextMenu.jsx';
import 'antd/dist/antd.css';

const dialogIframe = {
    top :20,
    width: 400,
    padding:0,
    frameborder:"no"  ,border:"0", marginwidth:"0" ,marginheight:"0" , allowtransparency:"yes"
};
const dialogDiv={
    top :20,
    width: "400",
    height: "400",
    padding:0
}
class Dialog extends React.Component {
    state = { visible: false,
         modelId:"",
        padding:0
    };

    showModal = () => {
        this.setState({
            visible: true,
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
                    新建
                </Button>
                <SeniorModal style={dialogDiv}  popup="true"
                    title="生成代码"
                             width='400'
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                             src={"/activiti/demo/actDemoEdit.html" }
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
                    children
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
        /**
         * data 列表数据
         * editingKey 点击那一行数据
         * visible  菜单是否显示
         * @type {{data: *[], editingKey: string, visible: boolean}}
         */
        this.state = { data:[{key:1}], editingKey: ''
           , visible:false};
        this.columns = [
            {dataIndex:'id',title:'序号',width:120,                    editable: false},
                {dataIndex:'name',title:'名称',width:120,                    editable: false},

            {dataIndex:'state',title:'状态',width:120,                    editable: false},
                {dataIndex:'createDate',title:'创建日期',width:250,                    editable: false,},
            {
                title: 'operation',
                dataIndex: 'operation',
                render: (text, record) => {
                    const { editingKey } = this.state;
                    const editable = this.isEditing(record);
                    return editable ? (
                        <span>
              <EditableContext.Consumer>
                {form => (
                    <a
                        href="javascript:;"
                        onClick={() => this.save(form, record.key)}
                        style={{ marginRight: 8 }}
                    >
                        Save
                    </a>
                )}
              </EditableContext.Consumer>
              <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.key)}>
                <a>Cancel</a>
              </Popconfirm>
            </span>
                    ) : (
                        <a disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>
                            Edit
                        </a>
                    );
                },
            },
        ];

    }
    componentWillMount(){
        this.findData()
    }

//获取数据
    findData = e =>{
        let _this=this;
        $.ajax({

            url: "/demo/list" ,
            dataType: "json",
            type: 'POST',
            contentType: 'application/json',
            async: false,//同步
            headers: {
                //  token: getCookie('token')
            },
            data: JSON.stringify( {"name":"xxx"}),

            error : function() {
                alert('请求失败');
            },
            success : function(res) {

                _this.setState({data:res.data})
                console.log("请求成功")

            }
        });
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
            <Menu.Item key="2"  onClick={this.start.bind(this)} >
                <a target="_blank" rel="noopener noreferrer">
                   提交工作流
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

    //提交工作流
    start =()=>{
        const selectedRowKeys = this.state.index;
        let _this=this;
        $.ajax({
            url: "/demo/start" ,
            dataType: "json",
            type: 'POST',
            contentType: 'application/json',
            async: false,//同步
            headers: {
                //  token: getCookie('token')
            },
            data: JSON.stringify( {"id":selectedRowKeys}),

            error : function() {
                alert('请求失败');
            },
            success : function(res) {
                _this.findData()
            }
        });

    }


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

    edit(key) {
        this.setState({ editingKey: key });
    }

    render() {
        const components = {
            body: {
                cell: EditableCell,
            },
        };

        const columns = this.columns.map(col => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    inputType: col.dataIndex === 'age' ? 'number' : 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });



        return (
            <EditableContext.Provider value={this.props.form}>
                <ContextMenu uevent={this.state.event}
                             status={this.changeStatus}
                             vuale={this.findMenu()}
                             del={this.del}
                             index={this.index}
                             visible={this.state.visible}
                                >


                </ContextMenu>
                <Table
                    components={components}
                    bordered
                    dataSource={this.state.data}
                    columns={columns}
                    rowClassName="editable-row"
                    pagination={{
                        onChange: this.cancel,
                    }}
                    dataIndex={"id"}
                    onRow={(record, index) => {
                        return {
                            onContextMenu: event => {
                                this.menu(event ,record.id)
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