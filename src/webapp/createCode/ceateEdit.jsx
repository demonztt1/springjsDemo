import ceateEdit  from './ceateEdit.html'
import { Table, Input, InputNumber, Popconfirm, Form,Row,Col ,Button  ,Icon ,ConfigProvider ,Menu } from 'antd';
import { render } from 'react-dom';
import React, { Component } from 'react';
import ContextMenu from '../../static/react/ContextMenu.jsx';

import 'antd/dist/antd.css';
//import toCamelCaseVer from "../../static/js/create/toCamelCaseVer";

import JSZip from 'jszip';
import saveAs from 'jszip/vendor/FileSaver';

import jquery from 'jquery'
window.$=jquery;

const EditableContext = React.createContext();


  function  toCamelCaseVer(variable, bigMark) {
    {
        let reg = /_+(\w)/g;
        variable = variable.toLowerCase();
        if (bigMark) {
            variable = variable.replace(/^./g, function () {
                if (arguments[2]) {
                    return (arguments[0]).toUpperCase();
                }
                return arguments[0];
            })
        }
        return variable.replace(reg, function () {
            if (arguments[2]) {
                return (arguments[1]).toUpperCase();
            }
            else {
                return arguments[0];
            }
        })
    }
}

const ftlData = [
    {
        "ftlPath": "/ftl/armo/entiyTemplate.ftl",
        "content": "IF_HIS_DATA",
        "loadType": "NVARCHAR2",
        "title": "实体类",
        "packagePath":"entiy",
        "suffix":".java"
    }, {
        "ftlPath": "/ftl/armo/mapperInterfaceTemplate.ftl",
        "content": "IF_HIS_DATA",
        "loadType": "NVARCHAR2",
        "title": "接口",
        "packagePath":"interface",
        "suffix":"Mapper.java"
    }, {
        "ftlPath": "/ftl/armo/mapperOracleTemplate.ftl",
        "content": "IF_HIS_DATA",
        "loadType": "NVARCHAR2",
        "title": "mapperXml",
        "packagePath":"mapper",
        "suffix":"Mapper.xml"
    }, {
        "ftlPath": "/ftl/armo/serviceTemplate.ftl",
        "content": "IF_HIS_DATA",
        "loadType": "NVARCHAR2",
        "title": "服务类",
        "packagePath":"service",
        "suffix":"Service.java"
    }, {
        "ftlPath": "/ftl/armo/shtmlEditTemplate.ftl",
        "content": "IF_HIS_DATA",
        "loadType": "NVARCHAR2",
        "title": "添加编辑页面",
        "packagePath":"shtml",
        "suffix":"Edit.shtml"
    }, {
        "ftlPath": "/ftl/armo/shtmlListTemplate.ftl",
        "content": "IF_HIS_DATA",
        "loadType": "NVARCHAR2",
        "title": "列表页",
        "packagePath":"shtml",
        "suffix":"List.shtml"
    }]

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
    //添加字段
    addField = () => {
        let index=this.props.data.length;
        let data=[...this.props.data,{"key":index+10}]
        this.props.pfn(data)//这个地方把值传递给了props的事件当中
    };

    //生成代码
    createCode =()=>{
        let fields=[...this.props.data]

        var title = "eo"
        var tableName = 'tableName';
        var packageName ="emeo"
        var zip = new JSZip();

        ftlData.forEach((e,i)=>{
                        let url='/static/'+e.ftlPath
            console.log(url)
                    let htmlobj=$.ajax({url:url,async:false});
                    let htmlpath=`${e.packagePath}/${packageName==""?tableName:packageName}/${tableName}${e.suffix}`;
                    // let obj1=`${htmlobj.responseText}`
                    let obj1= eval(htmlobj.responseText)
                    zip.file(htmlpath,obj1);
                }
            )
            zip.generateAsync({type:"blob"})
                .then(function(content) {
                    // see FileSaver.js
                    saveAs(content, "example.zip");
                });

    }
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
                        <Button  style={{ marginLeft: 8 }}  type="primary"  onClick={this.createCode}>
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
        this.state = { data:[{COLUMN_ID: "1",
                COLUMN_NAME: "1",
                COMMENTS: "1",
                DATA_DEFAULT: "1",
                DATA_LENGTH: "1",
                DATA_TYPE: "1",
                NULLABLE: "1",
                ShowType: "1",
                dataDomain: "1",
                isGroup: "1",
                isSelect: "1",
                key: 10}], editingKey: '',
            event:{}
            ,visible:false
            ,index:-1};
        this.columns = [
            {dataIndex:'key',title:'序号',width:80 ,editable: true},
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
       this.del=this.del.bind(this)
    }

    isEditing = record => record.key === this.state.editingKey;

    cancel = () => {
        this.setState({ editingKey: '' });
    };
    menu= (event,index) =>{
        console.log(index)
        this.setState({event:event,
            visible: true,index:index})
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

    del(){
        const selectedRowKeys = this.state.index;
        let dataSource = this.state.data;
            dataSource.splice(Number.parseInt(selectedRowKeys), 1);
        this.setState({
            data: dataSource,
            index: []
        })
    }

    findMenu(){
        return (<Menu>
            <Menu.Item key="0" onClick={this.del.bind(this)}>
                <a target="_blank" rel="noopener noreferrer" >
                    1st menu item
                </a>
            </Menu.Item>
            <Menu.Item key="1">
                <a target="_blank" rel="noopener noreferrer">
                    2nd menu item
                </a>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="3" disabled>
                3rd menu item（disabled）
            </Menu.Item>
        </Menu>)
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
                             visible={this.state.visible}>


                </ContextMenu>
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
                    key="COLUMN_ID"
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

