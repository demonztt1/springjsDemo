import index from './goods.html'

import { render } from 'react-dom';
import React, { Component } from 'react';
import 'antd/dist/antd.css';

import { Card, Icon, Avatar } from 'antd';

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
            res.push(<Card
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
            </Card>)
        }
        return res
    }

    render(){
        return (
            <div>  {this.findGoods()}
            </div>
        )
    }
}
render(
    <Goods/>,
    document.getElementById("goods")
);