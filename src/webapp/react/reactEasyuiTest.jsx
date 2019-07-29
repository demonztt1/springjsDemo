import React, { Component } from 'react';
import Button from 'antd/es/button';
import { render } from 'react-dom';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Button type="primary">Button</Button>
            </div>
        );
    }
}

// 加载组件到 DOM 元素 mountNode
render(<App name="root" />, John);