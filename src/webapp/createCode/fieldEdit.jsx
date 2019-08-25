import ceateEdit  from './ceateEdit.html'
import { Table, Input, InputNumber, Popconfirm, Form,Row,Col ,Button  ,Icon ,ConfigProvider  } from 'antd';
import { render } from 'react-dom';
import React, { Component } from 'react';
import 'antd/dist/antd.css';

import jquery from 'jquery'
window.$=jquery;

$(window).on('beforeunload', function(){
    return 'Are you sure you want to leave?';
});

class AdvancedSearchForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            expand: false,
            data:{}
        };
    }

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
    save = () => {
       /* let data=[...this.props.data,{}]
        this.props.pfn(data)//这个地方把值传递给了props的事件当中*/
       debugger
        top.close(this.state.data);
    };
    onInputChange(e) {
        this.setState({ value: e.target.value } );
    }

    render() {
        return (
            <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
ddd
                <Row gutter={24}>

                    <Col span={8}    >
                        <Form.Item label={`序号`}>
                            <Input className={"key"}
                                   defaultValue={this.state.data.key}/>
                        </Form.Item>
                    </Col>

                    <Col span={8}    >
                        <Form.Item label={`标题`}>
                            <Input className={"title"}
                                   defaultValue={this.state.data.title}/>
                        </Form.Item>
                    </Col>

                    <Col span={8}    >
                        <Form.Item label={`变量名`}>
                            <Input className={"name"}
                                   defaultValue={this.state.data.name}/>
                        </Form.Item>
                    </Col>

                    <Col span={8}    >
                        <Form.Item label={`数据库类型`}>
                            <Input className={"type"}
                                   defaultValue={this.state.data.type}/>
                        </Form.Item>
                    </Col>
                    <Col span={8}    >
                        <Form.Item label={`长度`}>
                            <Input className={"length"}
                                   defaultValue={this.state.data.length}/>
                        </Form.Item>
                    </Col>
                    <Col span={8}    >
                        <Form.Item label={`可空`}>
                            <Input className={"isNull"}
                                   defaultValue={this.state.data.isNull}/>
                        </Form.Item>
                    </Col>
                    <Col span={8}    >
                        <Form.Item label={`默认值`}>
                            <Input className={"default"}
                                   defaultValue={this.state.data.default}/>
                        </Form.Item>
                    </Col>
                    <Col span={8}    >
                        <Form.Item label={`小组`}>
                            <Input className={"group"}
                                   defaultValue={this.state.data.group}/>
                        </Form.Item>
                    </Col>
                    <Col span={8}    >
                        <Form.Item label={`显示类型`}>
                            <Input className={"showType"}
                                   defaultValue={this.state.data.showType}/>
                        </Form.Item>
                    </Col>
                    <Col span={8}    >
                        <Form.Item label={`下拉`}>
                            <Input className={"select"}
                                   defaultValue={this.state.data.select}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={{ textAlign: 'center' }}>

                        <Button  style={{ marginLeft: 8 }}  type="primary"  onClick={this.save}>
                            保存
                        </Button>
                        <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                            关闭
                        </Button>
                    </Col>
                </Row>
            </Form>
        );
    }
}

const AdvancedSearchFormTable = Form.create()(AdvancedSearchForm);
render(<AdvancedSearchFormTable />, root);