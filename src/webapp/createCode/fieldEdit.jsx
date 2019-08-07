import ceateEdit  from './ceateEdit.html'
import { Table, Input, InputNumber, Popconfirm, Form,Row,Col ,Button  ,Icon ,ConfigProvider  } from 'antd';
import { render } from 'react-dom';
import React, { Component } from 'react';
import 'antd/dist/antd.css';


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

const AdvancedSearchFormTable = Form.create()(AdvancedSearchForm);
render(<AdvancedSearchFormTable />, root);