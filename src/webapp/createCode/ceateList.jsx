import ceateFtlList  from './ceateFtlList.html'
import { Modal,Table, Input, InputNumber, Popconfirm, Form ,Button } from 'antd';
import { render } from 'react-dom';
import jquery from 'jquery'
import React, { Component } from 'react';
window.$=jquery;
import 'antd/dist/antd.css';
import ReactDOM from "react-dom";
const data = [
    {
    "ftlPath": "../ftl/armo/entiyTemplate.ftl",
    "content": "IF_HIS_DATA",
    "loadType": "NVARCHAR2",
    "title": "实体类",
    "packagePath":"entiy",
    "suffix":".java"
}, {
    "ftlPath": "../ftl/armo/mapperInterfaceTemplate.ftl",
    "content": "IF_HIS_DATA",
    "loadType": "NVARCHAR2",
    "title": "接口",
    "packagePath":"interface",
    "suffix":"Mapper.java"
}, {
    "ftlPath": "../ftl/armo/mapperOracleTemplate.ftl",
    "content": "IF_HIS_DATA",
    "loadType": "NVARCHAR2",
    "title": "mapperXml",
    "packagePath":"mapper",
    "suffix":"Mapper.xml"
}, {
    "ftlPath": "../ftl/armo/serviceTemplate.ftl",
    "content": "IF_HIS_DATA",
    "loadType": "NVARCHAR2",
    "title": "服务类",
    "packagePath":"service",
    "suffix":"Service.java"
}, {
    "ftlPath": "../ftl/armo/shtmlEditTemplate.ftl",
    "content": "IF_HIS_DATA",
    "loadType": "NVARCHAR2",
    "title": "添加编辑页面",
    "packagePath":"shtml",
    "suffix":"Edit.shtml"
}, {
    "ftlPath": "../ftl/armo/shtmlListTemplate.ftl",
    "content": "IF_HIS_DATA",
    "loadType": "NVARCHAR2",
    "title": "列表页",
    "packagePath":"shtml",
    "suffix":"List.shtml"
}]

const dialogIframe = {
    width: "100%",
    height: "100%",
    padding:0,
    frameborder:"no"  ,border:"0", marginwidth:"0" ,marginheight:"0" , allowtransparency:"yes"
};
const dialogDiv={
    padding:0
}
class Dialog extends React.Component {
    state = { visible: false,  padding:0 };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        console.log(e);
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
                <Button type="primary" onClick={this.showModal}>
                    Open Modal
                </Button>
                <Modal style={dialogDiv}  popup="true"
                    title="Basic Modal"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Index src='/createCode/ceateFtlList.html' ></Index>
                </Modal>
            </div>
        );
    }
}

class Index extends React.Component {

    constructor() {
        super();
        this.state = {
            iFrameHeight: '0px',
            iFrameWidth: '0px'
        }
    }



    render() {
        return (
            <iframe
                style={{width:'100%', height:this.state.iFrameHeight, overflow:'visible'}}
                onLoad={() => {
                    const obj = ReactDOM.findDOMNode(this);
                    this.setState({
                        "iFrameHeight":  obj.contentWindow.document.body.scrollHeight + 'px',
                        "iFrameWidth":  obj.contentWindow.document.body.scrollWidth + 'px'
                    });
                }}
                ref="iframe"
                src="/createCode/ceateFtlList.html"
                width={this.state.iFrameWidth}
                height={this.state.iFrameHeight}
                scrolling="aotu"
                frameBorder="0"
            />
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
        this.state = { data, editingKey: '' };
        this.columns = [
                {dataIndex:'ftlPath',title:'路径',width:120,                    editable: true},
                {dataIndex:'content',title:'内容',width:80,align:'right',    editable: true},
                {dataIndex:'loadType',title:'加载方式',width:80,align:'right',                    editable: true},
                {dataIndex:'title',title:'标题',width:250,                    editable: true},
                {dataIndex:'packagePath',title:'文件路径+包名',width:250,                    editable: true,},

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

                <Table
                    components={components}
                    bordered
                    dataSource={this.state.data}
                    columns={columns}
                    rowClassName="editable-row"
                    pagination={{
                        onChange: this.cancel,
                    }}
                />
                <div className="table-operations">
                    <Dialog></Dialog>
                    <Button onClick={this.setAgeSort}>添加</Button>
                    <Button onClick={this.clearFilters}>全部删除</Button>
                </div>
            </EditableContext.Provider>
        );
    }
}




const EditableFormTable = Form.create()(EditableTable);

render(<EditableFormTable />, root);
