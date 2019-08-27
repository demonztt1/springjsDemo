import index from './goods.html'

import { render } from 'react-dom';
import React, { Component } from 'react';
import 'antd/dist/antd.css';

import { Card, Icon, Avatar ,Col ,Row } from 'antd';

const { Meta } = Card;
class Goods extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            goods:[1,2,3]
        };

    }

    findGoods(){
        var res = [];
        for(var i = 0; i <  this.state.goods.length; i++) {


            res.push(

                <div style={{ background: '#ffffff', padding: '30px' }}>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Card
                                style={{ width: 300 }}
                                cover={
                                    <img
                                        alt="example"
                                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                    />
                                }
                                actions={[
                                    <Icon type="setting" key="setting" />,
                                    <Icon type="edit" key="edit" />,
                                    <Icon type="ellipsis" key="ellipsis" />,
                                ]}
                            >
                                <Meta
                                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title="Card title"
                                    description="This is the description"
                                />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card
                                style={{ width: 300 }}
                                cover={
                                    <img
                                        alt="example"
                                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                    />
                                }
                                actions={[
                                    <Icon type="setting" key="setting" />,
                                    <Icon type="edit" key="edit" />,
                                    <Icon type="ellipsis" key="ellipsis" />,
                                ]}
                            >
                                <Meta
                                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title="Card title"
                                    description="This is the description"
                                />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card
                                style={{ width: 300 }}
                                cover={
                                    <img
                                        alt="example"
                                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                    />
                                }
                                actions={[
                                    <Icon type="setting" key="setting" />,
                                    <Icon type="edit" key="edit" />,
                                    <Icon type="ellipsis" key="ellipsis" />,
                                ]}
                            >
                                <Meta
                                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title="Card title"
                                    description="This is the description"
                                />
                            </Card>
                        </Col>
                    </Row>
                </div>




        )
        }
        return res
    }

    render(){
        return (
            <Row gutter={16}>
                <Col span={6} />
                <Col span={6} />
                <Col span={6} />
                {this.findGoods()}
            </Row>
        )
    }
}
render(
    <Goods/>,
    document.getElementById("goods")
);