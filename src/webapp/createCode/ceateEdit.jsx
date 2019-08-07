import ceateEdit  from './ceateEdit.html'
import { Table, Input, InputNumber, Popconfirm, Form,Row,Col ,Button  ,Icon ,ConfigProvider ,Menu } from 'antd';
import { render } from 'react-dom';
import React, { Component } from 'react';
import ContextMenu from '../../static/react/ContextMenu.jsx';

import 'antd/dist/antd.css';

const EditableContext = React.createContext();

const umenu = (
    <Menu>
        <Menu.Item key="0">
            <a href="http://www.alipay.com/">1st menu item</a>
        </Menu.Item>
        <Menu.Item key="1">
            <a href="http://www.taobao.com/">2nd menu item</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3">3rd menu item</Menu.Item>
    </Menu>
);

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

class AdvancedSearchForm extends React.Component {
    state = {
        expand: false,
    };
    handleSearch = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log('Received values of form: ', values);
        });
    };

    handleReset = () => {
        this.props.form.resetFields();
    };

    toggle = () => {
        const { expand } = this.state;
        this.setState({ expand: !expand });
    };
    addField = () => {
        let data=[...this.props.data,{}]
        this.props.pfn(data)//这个地方把值传递给了props的事件当中
    };

    render() {
        return (
            <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
                <Row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <Button style={{ marginLeft: 8 }}  type="primary" htmlType="submit">
                            选择模板
                        </Button>
                        <Button style={{ marginLeft: 8 }}  type="primary" htmlType="submit">
                            选择字段默认参数
                        </Button>
                        <Button style={{ marginLeft: 8 }}  type="primary" htmlType="submit">
                            导入字段
                        </Button>
                        <Button  style={{ marginLeft: 8 }}  type="primary"  onClick={this.addField}>
                            添加字段
                        </Button>
                        <Button  style={{ marginLeft: 8 }}  type="primary" htmlType="submit">
                            生成代码
                        </Button>
                        <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                            关闭
                        </Button>
                    </Col>
                </Row>
                <Row gutter={24}>

                    <Col span={24}    >
                        <Form.Item label={`概述`}>
                            <Input className={"title"} placeholder="placeholder" />
                        </Form.Item>
                    </Col>

                    <Col span={24}    >
                        <Form.Item label={`表名`}>
                            <Input className={"tableName"} placeholder="placeholder" />
                        </Form.Item>
                    </Col>
                    <Col span={24}    >
                        <Form.Item label={`上级包名`}>
                            <Input className={"packageName"} placeholder="placeholder" />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        );
    }
}
class EditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data:[], editingKey: '',
            event:{}
            ,visible:false};
        this.columns = [
            {dataIndex:'COLUMN_ID',title:'序号',width:80 ,editable: true},
            {dataIndex:'COMMENTS',title:'标题',width:250,editable: true},
            {dataIndex:'COLUMN_NAME',title:'变量名',width:250,align:'right',editable: true},
            {dataIndex:'DATA_TYPE',title:'数据库类型',width:150,align:'right',editable: true},
            {dataIndex:'DATA_LENGTH',title:'长度',width:60,editable: true},
            {dataIndex:'NULLABLE',title:'是否可空',width:80,align:'center',editable: true},
            {dataIndex:'DATA_DEFAULT',title:'默认值',width:200,align:'center',editable: true},
            {dataIndex:'isGroup',title:'小组',width:120
                ,editor: {
                    type: 'textbox'}
                ,editable: true },
            {dataIndex:'ShowType',title:'显示类型',width:120
                ,editor: {
                    type: 'combobox',
                    options: {
                        valueField: 'VALUE',
                        textField: 'TEXT',
                        data:[{
                            "VALUE":1,
                            "TEXT":"文本"
                        },{
                            "VALUE":2,
                            "TEXT":"数字"
                        },{
                            "VALUE":3,
                            "TEXT":"单选"
                        },{
                            "VALUE":4,
                            "TEXT":"多选"
                        },{
                            "VALUE":5,
                            "TEXT":"日期"
                        }]
                    }   }
                ,editable: true},
            {dataIndex:'isSelect',title:'是否下拉',width:120
                ,editor: {
                    type: 'checkbox'}
                ,editable: true },
            {dataIndex:'dataDomain',title:'数据域',width:120
                ,editor: {
                    type: 'textbox'}
                ,editable: true},

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
    menu= (event) =>{
        this.setState({event:event,
            visible: true})
    }

    /*获取子组件传递过来的值*/

    changeStatus = (status) =>{
        this.setState({
            visible:status
        })
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
    fn(data) {
        this.setState({
            data: data //把父组件中的parentText替换为子组件传递的值
        },() =>{
            console.log(this.state.data);//setState是异步操作，但是我们可以在它的回调函数里面进行操作
        });

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
                             status={this.changeStatus} visible={this.state.visible}></ContextMenu>
               <AdvancedSearchForm pfn={this.fn.bind(this)} data={this.state.data}></AdvancedSearchForm>
                <Table
                    components={components}
                    bordered
                    dataSource={this.state.data}
                    columns={columns}
                    rowClassName="editable-row"
                    pagination={{
                        onChange: this.cancel,

                    }}
                    onRow={record => {
                        return {
                            onContextMenu: event => {
                              this.menu(event)
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

