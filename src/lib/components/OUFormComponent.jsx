/**
 * Created by Baggio on 2016/5/16.组织机构编辑form
 */
import ReactDOM from 'react-dom';
import React from 'react';
import { Button, Form, Input, Modal } from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;

let OUFormComponent = React.createClass({
    componentWillReceiveProps: function (nextProps) {
        this.setState({
            record: nextProps.record,
            visible: nextProps.visible
        });

    },
    getInitialState() {
        return {
            visible: false,
            record: {}
        };
    },

    handleSubmit() {
        var item = {
            _id: this.props.record._id,
            OUName: this.props.form.getFieldsValue().OUName,
            showOrder: this.props.form.getFieldsValue().showOrder
        }
        this.props.saveForm(item)
        this.hideModal()

    },
    hideModal() {
        this.setState({visible: false});
    },

    render() {
        const { getFieldProps } = this.props.form;

        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 16},
        };
        return (
            <div>

                <Modal title="组织机构" visible={this.state.visible} onOk={this.handleSubmit} onCancel={this.hideModal}
                       footer={[
            <Button key="back" type="ghost" size="large" onClick={this.hideModal}>取 消</Button>,
            <Button key="submit" type="primary" size="large" onClick={this.handleSubmit}>
              保 存
            </Button>,
          ]}>
                    <Form horizontal form={this.props.form}>
                        <FormItem
                            {...formItemLayout}
                            label="组织机构名称：">
                            <Input {...getFieldProps('OUName', {initialValue: this.props.record.OUName || null})}
                                type="text" autoComplete="off"/>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="序号：">
                            <Input {...getFieldProps('showOrder', {initialValue: this.props.record.showOrder || null})}
                                type="text" autoComplete="off"/>
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    },
});

OUFormComponent = createForm()(OUFormComponent);

export default OUFormComponent;
