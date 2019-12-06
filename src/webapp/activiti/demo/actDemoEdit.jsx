import html  from './actDemoEdit.html'
import { Icon, Input,Form ,Button,Select,DatePicker } from 'antd';
import { render } from 'react-dom';
import jquery from 'jquery'
import React, { Component } from 'react';
window.$=jquery;
import 'antd/dist/antd.css';
const { RangePicker } = DatePicker;
const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 },
};
class NormalLoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name:"",
                state:0,
            create_Date:""};
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

        $.ajax({

            url: "/demo/save" ,
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
            success : function(data) {
                console.log("请求成功")

            }
        });
    }
    // 文本框内容改变时的处理函数
    txtChanged = e => {
        this.setState({
            name: e.target.value
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item label="名称"  {...formItemLayout}>
                    <Input value={this.state.name} onChange={ e => this.txtChanged(e) }
                           prefix={<Icon type="user"   style={{ color: 'rgba(0,0,0,.25)' }} />}
                           placeholder="name"
                    />
                </Form.Item>
                <Form.Item label="状态"  {...formItemLayout}>
                    <Select  disabled  value ={this.state.state.toString()}  >

                        <Option value="0">新建</Option>
                        <Option value="1">提交</Option>
                        <Option value="2">审核</Option>
                        <Option value="3">审批</Option>
                        <Option value="4">完成</Option>
                        <Option value="5">退回</Option>
                    </Select>
                </Form.Item>
                <Form.Item  label="创建时间"   {...formItemLayout}>
                    <DatePicker showTime disabled  value={this.state.createDate}  placeholder="创建时间"   />
                </Form.Item>
                <Form.Item  {...formItemLayout}>
                    <Button type="primary"  onClick={this.ok} className="login-form-button">
                        保存
                    </Button>
                    <Button type="primary"  className="login-form-button">
                        关闭
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);
render(<WrappedNormalLoginForm />, root);