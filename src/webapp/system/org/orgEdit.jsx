import html  from './orgEdit.html'
import { Icon, Input,Form ,Button,Select,DatePicker,TreeSelect  } from 'antd';
import { render } from 'react-dom';
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import listToTree from "../../../static/js/tree/listToTree";
import instance from "../../../static/utils/axios.config";
const { RangePicker } = DatePicker;
const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 },
};
class NormalLoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data:{name:"",
                sort:"",
                pid:0,
                defaultRole:""},
            treeData:[]};
    }

    /**
     * 初始化数据
     */
    componentDidMount = () => {
        let _this=this;

        instance.post('/org/list',{} )
            .then((resdata) => {
                for (let i=0;i<resdata.length;i++){
                    resdata[i].key=resdata[i].id;
                    resdata[i].title=resdata[i].name;
                    resdata[i].value=resdata[i].id;
                }
                let data=new listToTree(resdata).totree();
                _this.setState({
                    treeData:data
                });
            })
            .catch(error => {
                alert('请求失败');
            })


        window.receiveMessageFromIndex = function ( event ) {
            if(event!=undefined){
                if(event.data.pid ){
                    let data=_this.state.data;
                    data.pid=event.data.pid
                    _this.setState({
                        data //2.给变量赋值
                    })
                }
                if(event.data.id ){
                    let data=_this.state.data;
                    data.id=event.data.id
                    _this.setState({
                        data //2.给变量赋值
                    })
                }

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



    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);

            }
        });
    };
    ok = e =>{
        let _this=this;
        instance.post('/org/save',_this.state.data)
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

    // 文本框内容改变时的处理函数
    txtChanged = e => {
        let _this=this;
        let data=_this.state.data;
        data[e.target.id]=e.target.value

        _this.setState({
            data
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item label="名称"  {...formItemLayout}>
                    <Input id={"name"} value={this.state.data.name} onChange={ e => this.txtChanged(e) }
                           prefix={<Icon type="name"   style={{ color: 'rgba(0,0,0,.25)' }} />}
                           placeholder="name"
                    />
                </Form.Item>
                <Form.Item label="上级"  {...formItemLayout}>
                    <TreeSelect   id={"pid"}  value ={this.state.data.pid.toString()

                    }
                                   treeData={this.state.treeData}
                    >

                    </TreeSelect>
                </Form.Item>
                <Form.Item label="排序"  {...formItemLayout}>
                    <Input id={"sort"} value={this.state.data.sort} onChange={ e => this.txtChanged(e) }
                           prefix={<Icon type="sort"   style={{ color: 'rgba(0,0,0,.25)' }} />}
                           placeholder="name"
                    />
                </Form.Item>
                <Form.Item label="用户默认角色"  {...formItemLayout}>
                    <Input id={"defaultRole"} value={this.state.data.defaultRole} onChange={ e => this.txtChanged(e) }
                           prefix={<Icon type="defaultRole"   style={{ color: 'rgba(0,0,0,.25)' }} />}
                           placeholder="name"
                    />
                </Form.Item>
                <Form.Item  {...formItemLayout}>
                    <Button type="primary"  onClick={this.ok} className="login-form-button">
                        保存
                    </Button>
                    <Button type="primary"  onClick={this.close} className="login-form-button">
                        关闭
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);
render(<WrappedNormalLoginForm />, root);