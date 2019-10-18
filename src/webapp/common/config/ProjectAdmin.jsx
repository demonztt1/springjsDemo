import ceateEdit  from './structureConfigEdit.html'
import { Table, Input, InputNumber, Popconfirm, Form,Row,Col ,Button  ,Icon ,ConfigProvider ,Menu
    ,Divider} from 'antd';
import { render } from 'react-dom';
import React, { Component } from 'react';

import 'antd/dist/antd.css';

import jquery from 'jquery'
window.$=jquery;
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
            ftlName,
            fieldType,
            title,
            ftlPyth,
            userId,
            index,
            ceatelDate,
            editingKey,
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
}

const EditableTableForm = Form.create()(EditableTable);
class AdvancedSearchForm extends React.Component {

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
                key:1},{editing:1,
                ftlName: "1",
                fieldType: "1",
                title: "1",
                ftlPyth: "1",
                userId: "1",
                ceatelDate: "1",
                editingKey: 10,
                key:2}], editingKey: '' };
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
                            <Input className={"title"} placeholder="placeholder" />
                        </Form.Item>
                    </Col>
                    <Col span={6}    >
                        <Form.Item label={`项目版本`}>
                            <Input className={"title"} placeholder="placeholder" />
                        </Form.Item>
                    </Col>
                    <Col span={6}    >
                        <Form.Item label={`代码目录`}>
                            <Input className={"title"} placeholder="placeholder" />
                        </Form.Item>
                    </Col>
                    <Col span={6}    >
                        <Form.Item label={`编译目录`}>
                            <Input className={"title"} placeholder="placeholder" />
                        </Form.Item>
                    </Col>
                    <Col span={24}    >
                        <Form.Item label={`项目说明`}>
                            <Input className={"title"} placeholder="placeholder" />
                        </Form.Item>
                    </Col>

                    <Divider orientation="left">继承项目</Divider>
                    <Col span={6}    >
                        <Form.Item label={`项目名称`}>
                            <Input className={"title"} placeholder="placeholder" />
                        </Form.Item>
                    </Col>
                    <Col span={6}    >
                        <Form.Item label={`项目版本`}>
                            <Input className={"title"} placeholder="placeholder" />
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
                        ></EditableTableForm>
                    </Col>
                </Row>

            </Form>
        );
    }
}


render(<AdvancedSearchForm />, root);

