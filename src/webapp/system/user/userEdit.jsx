import html  from './userEdit.html'
import { Icon, Input,Form ,Button,Select,DatePicker,TreeSelect  } from 'antd';
import { render } from 'react-dom';
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import listToTree from "../../../static/js/tree/listToTree";

import instance from '../../../static/utils/axios.config.js'

const { RangePicker } = DatePicker;
const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 },
};
class NormalLoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data:{name:"",
                url:"",
                pid:0,
            create_Date:""},
            treeData:[]};
    }

    /**
     * 初始化数据
     */
    componentDidMount = () => {

        let _this=this;
        window.receiveMessageFromIndex = function ( event ) {
            if(event!=undefined){
                if(event.data.id ){

                    let params = {
                        id:event.data.id
                    };
                    instance.post('/user/findById',params) .then((data) => {

                        _this.setState({data})

                    }).catch(error => {
                        alert('请求失败');
                    });
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
        let params = _this.state.data;
        instance.post('/user/save',params) .then((data) => {
            console.log("请求成功")
            _this.setState({
                data
            })


        }).catch(error => {
            alert('请求失败');
        });
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
                <Form.Item label="账号"  {...formItemLayout}>
                    <Input id={"id"} value={this.state.data.id}  disabled  />
                </Form.Item>
                <Form.Item label="名称"  {...formItemLayout}>
                    <Input id={"username"} value={this.state.data.username} onChange={ e => this.txtChanged(e) }
                           prefix={<Icon type="username"   style={{ color: 'rgba(0,0,0,.25)' }} />}
                           placeholder="username"
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