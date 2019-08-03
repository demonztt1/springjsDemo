import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Button } from 'antd';
import './QreactEasyuiTest.css';

ReactDOM.render(
    <div>
        <Button type="primary">Primary</Button>
        <Button>Default</Button>
        <Button type="dashed">Dashed</Button>
        <Button type="danger">Danger</Button>
        <Button type="link">Link</Button>
    </div>,
    document.getElementById('container'),
);
