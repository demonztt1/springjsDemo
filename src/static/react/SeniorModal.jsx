
import  React from 'react';
import DragM from 'dragm';
import Modal from "antd/lib/modal/Modal";
import ReactDOM from "react-dom";

/**
 * 弹窗带移动
 */
class ModalTitle extends React.Component {
    updateTransform = transformStr => {
        this.modalDom.style.transform = transformStr;
    };
    componentDidMount() {
        this.modalDom = document.getElementsByClassName(
            "ant-modal-wrap" //modal的class是ant-modal-wrap
        )[0];
    }
    render() {
        const { title } = this.props;
        return (
            <DragM updateTransform={this.updateTransform}>
                <div>{title}</div>
            </DragM>
        );
    }
}


class Index extends React.Component {

    constructor() {
        super();
        this.state = {
            iFrameHeight: '0px',
            iFrameWidth: '0px'
        }
    }

    close =(val)=>{
        debugger;
        this.props.onOk(val);
    }

    render() {
        const {src} = this.props;
        return (
            <iframe
                style={{width:'100%', height:this.state.iFrameHeight, overflow:'visible'}}
                onClose={this.close}
                onLoad={() => {
                    const obj = ReactDOM.findDOMNode(this);
                    this.setState({
                        "iFrameHeight":  obj.contentWindow.document.body.scrollHeight + 'px',
                        "iFrameWidth":  obj.contentWindow.document.body.scrollWidth + 'px'
                    });
                    obj.contentWindow.top.close=this.close.bind(this)
                }}

                ref="iframe"


                src={src}
                width={this.state.iFrameWidth}
                height={this.state.iFrameHeight}
                scrolling="aotu"
                frameBorder="0"
            />
        );
    }
}
export  default  class SeniorModal extends  React.Component{
    render() {
        const title = <ModalTitle title={this.props.title} />;
        const {src,width} = this.props;
        return (
            <Modal
                width={width}
                {...this.props}
                title={title}
                footer={null}
            >
                {this.props.children}
                <Index  src={src} onOk={this.props.onOk}></Index>
            </Modal>
        );
    }
}