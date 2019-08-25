import ceateFieldList  from './ceateFieldList.html'
import { Table, Input, InputNumber, Popconfirm, Form } from 'antd';
import { render } from 'react-dom';
import jquery from 'jquery'
import React, { Component } from 'react';
window.$=jquery;
import 'antd/dist/antd.css';
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
            </EditableContext.Provider>
        );
    }
}

const EditableFormTable = Form.create()(EditableTable);

render(<EditableFormTable />, root);
