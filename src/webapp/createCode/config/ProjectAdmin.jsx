import ceateEdit  from './structureConfigEdit.html'
import { Table, Input, InputNumber, Popconfirm, Form,Row,Col ,Button  ,Icon ,ConfigProvider ,Menu
    ,Divider} from 'antd';
import { render } from 'react-dom';
import React, { Component } from 'react';
const { TextArea } = Input;
import 'antd/dist/antd.css';

import jquery from 'jquery'
window.$=jquery;
const EditableContext = React.createContext();


/*
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
            ftlName,
            fieldType,
            title,
            ftlPyth,
            userId,
            index,
            ceatelDate,
            editingKey,
            children,
            dataIndex,
            record,
            ...restProps
        } = this.props;
        debugger;
        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item style={{ margin: 0 }}>
                        { getFieldDecorator(dataIndex, {
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
        this.state = { data:[{editing:1,
                ftlName: "1",
                fieldType: "1",
                title: "1",
                ftlPyth: "1",
                userId: "1",
                ceatelDate: "1",
                editingKey: 10,
            key:1}], editingKey: '' };
        this.columns = [
            {dataIndex:'key',title:'序号',width:120,                    editable: true},
            {dataIndex:'ftlName',title:'项目名称',width:120,                    editable: true},
            {dataIndex:'fieldType',title:'项目版本',width:120,    editable: true},
            {dataIndex:'ftlPyth',title:'项目位置',width:120,                    editable: true},
            {dataIndex:'userId',title:'项目说明',width:250,                    editable: true,},
            {dataIndex:'ceatelDate',title:'创建日期',width:250,                    editable: true,},

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
                    editing: this.isEditing(record),
                }),
            };
        });

        return (
            <EditableContext.Provider value={this.props.form}>

                <Table
                    components={components}
                    bordered
                    dataSource={this.props.data}
                    columns={columns}
                    rowClassName="editable-row"
                    pagination={{
                        onChange: this.cancel,
                    }}
                />
            </EditableContext.Provider>
        );
    }
}*/

const data = [];
for (let i = 0; i < 100; i++) {
    data.push({
        key: i.toString(),
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`,
    });
}

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
        this.state = { data:[], editingKey: '' };
        this.columns = [
            {dataIndex:'key',title:'序号',width:120,                    editable: true},
            {dataIndex:'ftlName',title:'项目名称',width:120,                    editable: true},
            {dataIndex:'fieldType',title:'项目版本',width:120,    editable: true},
            {dataIndex:'ftlPyth',title:'项目位置',width:120,                    editable: true},
            {dataIndex:'userId',title:'项目说明',width:250,                    editable: true,},
            {dataIndex:'ceatelDate',title:'创建日期',width:250,                    editable: true,},

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
            const newData = [...this.props.datathis.state.data];
            const index = newData.findIndex(item => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                this.props.datathis.setState({ data: newData, editingKey: '' });
                this.setState({  editingKey: '' });
            } else {
                newData.push(row);
                this.props.datathis.setState({ data: newData, editingKey: '' });
                this.setState({  editingKey: '' });
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
                    dataSource={this.props.data}
                    columns={columns}
                    rowClassName="editable-row"
                    pagination={{
                        onChange: this.cancel,
                    }}
                />
            </EditableContext.Provider>
        );
    }
}


const EditableTableForm = Form.create()(EditableTable);
class AdvancedSearchForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data:[], editingKey: '' };
        this.columns = [
            {dataIndex:'key',title:'序号',width:120,                    editable: true},
            {dataIndex:'ftlName',title:'项目名称',width:120,                    editable: true},
            {dataIndex:'fieldType',title:'项目版本',width:120,    editable: true},
            {dataIndex:'ftlPyth',title:'项目位置',width:120,                    editable: true},
            {dataIndex:'userId',title:'项目说明',width:250,                    editable: true,},
            {dataIndex:'ceatelDate',title:'创建日期',width:250,                    editable: true,},

            {
                title: '操作',
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
        this.init();
    }

    init=()=>{
        let resdata=this.loadData();
        let words=[]
        resdata.then(function( data) {
            // 读取文件成功
            let lint=data.split(/[\r\n]+/);
            for (let i=0;i<lint.length;i++){
                let word =lint[i].split(',');
                console.log(word)
            }
        })
    }

    loadData=()=>{
        let data=`名称，,,projectName
0.0.1，,,projectVersion
说明，,,projectExplain

继承项目，,,inheritName
0.0.1，,,inheritVersion



名称，,,relyName
0.0.1，,,relyVersion
位置，,,relyPyth
说明，,,relyExplain
创建日期，,,ceatelDate
`

        return new Promise(function (resolve, reject) {
            resolve(data)
        })
    }


    //添加依赖数据
    addField = () => {
        let _this=this
        let data=this.state.data;
        let index=data.length;
         data=[...data,{"key":index+10}]
        this.setState({data})
    };

    render() {
        return (
            <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
                <Row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <Button style={{ marginLeft: 8 }}  type="primary" htmlType="submit">
                            推荐配置
                        </Button>
                        <Button style={{ marginLeft: 8 }}  type="primary" htmlType="submit">
                            添加内部仓库
                        </Button>
                        <Button style={{ marginLeft: 8 }}  type="primary" htmlType="submit">
                            导入字段
                        </Button>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Divider orientation="left">项目信息</Divider>
                    <Col span={6}    >
                        <Form.Item label={`项目名称`}>
                            <Input className={"projectName"} placeholder="项目名称" />
                        </Form.Item>
                    </Col>
                    <Col span={6}    >
                        <Form.Item label={`项目版本`}>
                            <Input  className={"projectVersion"} placeholder="项目版本" />
                        </Form.Item>
                    </Col>
                    <Col span={6}    >
                        <Form.Item label={`目录`}>
                            <Input className={"projectPath"} placeholder="目录" />
                        </Form.Item>
                    </Col>
                    <Col span={24}    >
                        <Form.Item label={`项目说明`}>
                            <TextArea rows={4} className={"explain"} placeholder="项目说明" />
                        </Form.Item>
                    </Col>

                    <Divider orientation="left">继承项目</Divider>
                    <Col span={6}    >
                        <Form.Item label={`项目名称`}>
                            <Input className={"inheritName"} placeholder="项目名称" />
                        </Form.Item>
                    </Col>
                    <Col span={6}    >
                        <Form.Item label={`项目版本`}>
                            <Input className={"inheritVersion"} placeholder="项目版本" />
                        </Form.Item>
                    </Col>
                    <Divider orientation="left">依赖</Divider>
                    <Col span={24} style={{ textAlign: 'right' }}>


                        <Button style={{ marginLeft: 8 }}  type="primary"  onClick	={this.addField}  >
                            添加
                        </Button>
                        <Button style={{ marginLeft: 8 }}  type="primary" htmlType="submit">
                            展开所以选项
                        </Button>
                        <Button style={{ marginLeft: 8 }}  type="primary" htmlType="submit">
                            删除全部
                        </Button>
                        <Button style={{ marginLeft: 8 }}  type="primary" htmlType="submit">
                            批量添加
                        </Button>
                        <Button style={{ marginLeft: 8 }}  type="primary" htmlType="submit">
                            显示全部依赖
                        </Button>
                        <Button style={{ marginLeft: 8 }}  type="primary" htmlType="submit">
                            依赖冲突管理
                        </Button>
                        <Button style={{ marginLeft: 8 }}  type="primary" htmlType="submit">
                            加载顺序
                        </Button>
                    </Col>
                    <Col span={24}    >
                        <EditableTableForm
                        data ={this.state.data}
                        datathis={this}
                        ></EditableTableForm>
                    </Col>
                </Row>

            </Form>
        );
    }
}


render(<AdvancedSearchForm />, root);

