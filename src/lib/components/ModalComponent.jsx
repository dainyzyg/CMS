/**
 * Created by Baggio on 2016/3/30.
 */
import ReactDOM from 'react-dom';
import React from 'react';
import { Modal, Button,Col, Row, Input,Form } from 'antd';
import FormComponent from './FormComponent.jsx';
var ModalComponent  = React.createClass({
    componentWillReceiveProps: function(nextProps) {
        console.log('nextProps.record',nextProps.record)
        this.setState({
            visible: nextProps.visible,
            record:nextProps.record
        });
    },
    getInitialState() {
        return {
            ModalText: '对话框的内容',
            visible: false
        };
    },
    //showModal() {
    //    this.setState({
    //        visible: true
    //    });
    //},
    //handleOk() {
    //    this.setState({
    //        ModalText: '对话框将在两秒后关闭',
    //        confirmLoading: true
    //    });
    //    setTimeout(() => {
    //        this.setState({
    //            visible: false,
    //            confirmLoading: false
    //        });
    //    }, 2000);
    //},
    handleCancel() {
        console.log('点击了取消');
        this.setState({
            visible: false
        });
        console.log('Modal record',this.state.record);
        console.log('Modal record',this.props.record);
    },
    save(e){
        console.log('在Modal中打印表单值',e);
        this.props.saveForm(e);
        this.handleCancel();
    },
    render() {
        return (
            <div>

                <Modal ref="modal"
                       visible={this.state.visible}
                       title="编辑菜单"
                       onCancel={this.handleCancel}
                       footer={[
            <Button key="back" type="ghost" size="large" onClick={this.handleCancel}>返 回</Button>
          ]}>
                    <FormComponent save={this.save} record={this.state.record}/>
                </Modal>


            </div>
        );
    }
});

export default ModalComponent;