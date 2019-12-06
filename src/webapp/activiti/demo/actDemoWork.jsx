import html  from './actDemoList.html'
import { render } from 'react-dom';
import jquery from 'jquery'
import React, { Component } from 'react';
window.$=jquery;
import 'antd/dist/antd.css';
import workflow from '../../../static/js/workflow/workflow.js';



import { Radio,Button } from 'antd';


class App extends React.Component {
    state = {
        value: 1,
        instanceId:""
    };
    componentDidMount(){    //问题延申：React数据获取为什么一定要在componentDidMount里面调用？
        let _this = this;    //为了避免作用域及缓存
        window.receiveMessageFromIndex = function ( event ) {
            if(event!=undefined){
                if(event.data.instanceId ){
                    _this.setState({
                        instanceId:event.data.instanceId  //2.给变量赋值
                    })
                }

            }
        }
        //监听message事件
        window.addEventListener("message", receiveMessageFromIndex, false);
    };
    onChange = e => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    };
    showModal = ()=>{
        this.setState({
            value:2
        });
    }
    showImg =()=>
    {
        if(!this.state.instanceId)       return;
        return <embed src={"/workFlow/showImg?instanceId="+this.state.instanceId}
                      style={{width:'1000px' ,height:'450px'}} />
    }

    next =() =>{
        let _this=this;
        $.ajax({

            url: "/workFlow/next" ,
            dataType: "json",
            type: 'POST',
            contentType: 'application/json',
            async: false,//同步
            headers: {
                //  token: getCookie('token')
            },
            data: JSON.stringify( {"instanceId":_this.state.instanceId}),

            error : function() {
                alert('请求失败');
            },
            success : function(res) {

                _this.setState( )
                console.log("请求成功")

            }
        });
    }
    render() {

        return (
            <div>
                <div  style={{width:'1000px' ,height:'450px'}} >
                    {this.showImg()}
                </div>


                <Button type="primary" onClick={this.showModal} style={{ textAlign: 'right' }}>
                    后退到开始
                </Button>
                <Button type="primary" onClick={this.showModal} style={{ textAlign: 'right' }}>
                    后退
                </Button>
                <Button type="primary" onClick={this.next} style={{ textAlign: 'right' }}>
                    下一步
                </Button>

            </div>

        );
    }
}



render(<App />, root);