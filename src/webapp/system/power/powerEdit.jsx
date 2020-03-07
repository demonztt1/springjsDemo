import html  from './powerEdit.html'
import { Icon, Input,Form ,Button,Select,DatePicker,TreeSelect  } from 'antd';
import { render } from 'react-dom';
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import listToTree from "../../../static/js/tree/listToTree";
const { RangePicker } = DatePicker;
const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 },
};
class NormalLoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data:{name:"",
                url:"",
                pid:0,
            create_Date:""},
            treeData:[]};
    }

    /**
     * 初始化数据
     */
    componentDidMount = () => {
        let _this=this;
        $.ajax({
            url : "/sysMenu/list",
            dataType: "json",
            type: 'POST',
            contentType: 'application/json',
            async: false,//同步
            headers: {
                //  token: getCookie('token')
            },
            data: JSON.stringify( { }),
        }).then( (res) => {
            let resdata=res.data;
            for (let i=0;i<resdata.length;i++){
                resdata[i].key=resdata[i].id;
                resdata[i].title=resdata[i].name;
                resdata[i].value=resdata[i].id;
            }
            let data=new listToTree(resdata).totree();


            _this.setState({
                treeData:data
            });
        })
            .catch(error => {
                alert('请求失败');
            });


        window.receiveMessageFromIndex = function ( event ) {
            if(event!=undefined){
                if(event.data.pid ){
                    let data=_this.state.data;
                    data.pid=event.data.pid
                    _this.setState({
                        data //2.给变量赋值
                    })
                }

            }
        }
        //监听message事件
        window.addEventListener("message", receiveMessageFromIndex, false);

    }
    componentWillUnmount = () => {
        this.setState = (state,callback)=>{
            return;
        };
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
        let _this=this;
        $.ajax({

            url: "/sysMenu/save" ,
            dataType: "json",
            type: 'POST',
            contentType: 'application/json',
            async: false,//同步
            headers: {
              //  token: getCookie('token')
            },
            data: JSON.stringify( _this.state.data),

            error : function() {
                alert('请求失败');
            },
            success : function(data) {
                console.log("请求成功")
                top.close(1);

            }
        });
    }
        //关闭页面
    close =()=>{
        top.close();
    }

    // 文本框内容改变时的处理函数
    txtChanged = e => {
        let _this=this;
        let data=_this.state.data;
        data[e.target.id]=e.target.value

        _this.setState({
            data
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item label="名称"  {...formItemLayout}>
                    <Input id={"name"} value={this.state.data.name} onChange={ e => this.txtChanged(e) }
                           prefix={<Icon type="name"   style={{ color: 'rgba(0,0,0,.25)' }} />}
                           placeholder="name"
                    />
                </Form.Item>
                <Form.Item label="链接"  {...formItemLayout}>
                    <Input id={"url"} value={this.state.data.url} onChange={ e => this.txtChanged(e) }
                           prefix={<Icon type="list"   style={{ color: 'rgba(0,0,0,.25)' }} />}
                           placeholder="name"
                    />
                </Form.Item>
                <Form.Item label="上级"  {...formItemLayout}>
                    <TreeSelect   id={"pid"}  value ={this.state.data.pid.toString()

                    }
                                   treeData={this.state.treeData}
                    >

                    </TreeSelect>
                </Form.Item>
                <Form.Item  label="创建时间"   {...formItemLayout}>
                    <DatePicker showTime disabled  id={"createDate"} value={this.state.data.createDate}  placeholder="创建时间"   />
                </Form.Item>
                <Form.Item  {...formItemLayout}>
                    <Button type="primary"  onClick={this.ok} className="login-form-button">
                        保存
                    </Button>
                    <Button type="primary"  onClick={this.close} className="login-form-button">
                        关闭
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);
render(<WrappedNormalLoginForm />, root);