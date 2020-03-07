import ceateEdit  from './structureConfigEdit.html'
import { Table, Input, InputNumber, Popconfirm, Form,Row,Col ,Button  ,Icon ,ConfigProvider ,Menu } from 'antd';
import { render } from 'react-dom';
import React, { Component } from 'react';

import 'antd/dist/antd.css';

import jquery from 'jquery'
window.$=jquery;
const EditableContext = React.createContext();




class AdvancedSearchForm extends React.Component {
    render() {
        return (
            <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
                <Row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <Button style={{ marginLeft: 8 }}  type="primary" htmlType="submit">
                            推荐配置
                        </Button>
                        <Button style={{ marginLeft: 8 }}  type="primary" htmlType="submit">
                            添加内部仓库
                        </Button>
                        <Button style={{ marginLeft: 8 }}  type="primary" htmlType="submit">
                            导入字段
                        </Button>

                    </Col>
                </Row>
                <Row gutter={24}>

                    <Col span={24}    >
                        <Form.Item label={`中心仓库`}>
                            <Input className={"title"} placeholder="placeholder" />
                        </Form.Item>
                    </Col>
                    <Col span={24}    >
                        <Form.Item label={`内部仓库`}>
                            <Input className={"title"} placeholder="placeholder" />
                        </Form.Item>
                    </Col>
                    <Col span={24}    >
                        <Form.Item label={`本地仓库`}>
                            <Input className={"title"} placeholder="placeholder" />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        );
    }
}


render(<AdvancedSearchForm />, root);

