
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import instance from '../../../static/utils/axios.config.js'

import tokenUtils from '../../../static/utils/tokenUtils.js'
class NormalLoginForm extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            instance.post('/login/findToken',values) .then((data) => {
                tokenUtils.save(data.token)
                top.close(true);
            }).catch(error => {
                alert('请求失败');
            });
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };
    //关闭页面
    close =()=>{
        top.close();
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('id', {
                        rules: [{ required: true, message: '请输入账号!' }],
                    })(
                        <Input
                            prefix={<Icon type="id" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="账号"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码!' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="密码"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(<Checkbox>  记住我</Checkbox>)}
                    <Button type="primary"  htmlType='submit' className="login-form-button">
                        登录
                    </Button>
                     <a href="">刷新!</a>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

ReactDOM.render(<WrappedNormalLoginForm />, document.getElementById('container'));
          