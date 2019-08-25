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
import SeniorModal from '../../static/react/SeniorModal.jsx';
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
const dialogDiv={
    top :20,
    width: "780",
    height: "780",
    padding:0
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

        ajax =(url)=>{
            let res = new Promise(function(resolve, reject) {

                var xhr = new XMLHttpRequest();//创建新的XHR对象
                xhr.open('GET', url);//指定获取数据的方式和url地址
                let blob;
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;");
                xhr.responseType = 'blob';//以blob的形式接收数据，一般文件内容比较大
                xhr.onload = function (e) {
                    resolve(this.response)      ;//Blob数据

                };
                xhr.send(); //post请求传的参数
            })
            return res
        }

    //生成代码
    createCode =()=>{
        let fields=[...this.props.data]

        var title = "eo"
        var tableName = 'tableName';
        var packageName ="emeo"
        var zip = new JSZip();
        let url='/static/ftl/armo.zip'

        this.ajax(url).then( function (blob) {
            return JSZip.loadAsync(blob)
        }) .then(function (zipu) {
            //多个异步返回操作 和  Promise.all 配合使用
            let ress=new Array()
            zipu.folder().forEach((e,i)=>{
                    if(!i.dir){
                     let res=new Promise(resolve => {
                         zipu.file(e).async("string")
                             .then(function (w, i) {
                                 let obj1= eval(w) ;
                                 zip.file(e,obj1);
                                 resolve("")
                             });
                     })
                        ress.push(res);
                    }
                }
            )
            Promise.all(ress).then(()=>
            {
                //多个异步返回操作 和  Promise.all 配合使用
                //添加下载
                zip.generateAsync({type:"blob"})
                    .then(function(content) {
                        // see FileSaver.js
                        saveAs(content, "example.zip");
                    });
            })

            return zipu.folder();
        }).then(function (dirs) {
            console.table(dirs.files);
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
        this.state = { data:[{columnId: "1",
                name: "1",
                title: "1",
                default: "1",
                length: "1",
                type: "1",
                isNull: "1",
                showType: "1",
                group: "1",
                select: "1",
                key: 10}], editingKey: '',
            event:{}
            ,visible:false
            ,index:-1
            ,winVisible:false};
        this.columns = [
            {dataIndex:'key',title:'序号',width:80 ,editable: true},
            {dataIndex:'column_id',title:'序号',width:80 ,editable: true},
            {dataIndex:'title',title:'标题',width:250,editable: true},
            {dataIndex:'columnName',title:'变量名',width:250,align:'right',editable: true},
            {dataIndex:'dataType',title:'数据库类型',width:150,align:'right',editable: true},
            {dataIndex:'dataLength',title:'长度',width:60,editable: true},
            {dataIndex:'isNull',title:'是否可空',width:80,align:'center',editable: true},
            {dataIndex:'data_default',title:'默认值',width:200,align:'center',editable: true},
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
        this.winEdit=this.winEdit.bind(this)
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

    winEdit(){
        this.setState({
            winVisible:true
        })
    }


    findMenu(){
        return (<Menu>
            <Menu.Item key="0" onClick={this.del.bind(this)}>
                <a target="_blank" rel="noopener noreferrer" >
                   删除
                </a>
            </Menu.Item>
            <Menu.Item key="1" onClick={this.winEdit.bind(this)}>
                <a target="_blank" rel="noopener noreferrer">
                    编辑
                </a>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="3" disabled>
               查看信息
            </Menu.Item>
        </Menu>)
    }


    handleOk = e => {
        const selectedRowKeys = this.state.index;
        console.log(selectedRowKeys);
        this.setState({
            winVisible: false,
        });
        debugger;
        console.table("窗口关闭" +e)
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            winVisible: false,
        });
    };
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
                <SeniorModal style={dialogDiv}  popup="true"
                             title="编辑字段"
                             width='800'
                             visible={this.state.winVisible}
                             onOk={this.handleOk}
                             onCancel={this.handleCancel}
                             src="/createCode/fieldEdit.html"
                >

                </SeniorModal>
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

