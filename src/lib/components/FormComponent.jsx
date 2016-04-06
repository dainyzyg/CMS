/**
 * Created by Baggio on 2016/3/30.
 */
import ReactDOM from 'react-dom';
import React from 'react';
import { Modal, Button,Col, Row, Input,Form,DatePicker  } from 'antd';
const FormItem = Form.Item;
let FormComponent = React.createClass({
    componentWillReceiveProps: function (nextProps) {
        this.setState({
            record: nextProps.record
        });
        //this.nextProps.form.setFieldsValue({
        //    description: this.nextProps.record.description,
        //    menuName: this.nextProps.record.menuName,
        //    showOrder: this.nextProps.record.showOrder,
        //    functionURL: this.nextProps.record.functionURL,
        //    _id: this.nextProps.record._id,
        //});
    },
    componentDidMount() {
        //console.log('form this',this.props)
        //console.log('form record',this.props.record)
        if (this.props.record) {
            this.props.form.setFieldsValue({
                    description: this.props.record.description,
                    menuName: this.props.record.menuName,
                    showOrder: this.props.record.showOrder,
                    functionURL: this.props.record.functionURL,
                    _id: this.props.record._id,
                }
            )
            console.log('this.props.form',this.props.form.getFieldsValue())
        }
    },
    handleSubmit(e) {
        e.preventDefault();

        console.log('this.props.form', this.props.form.getFieldsValue());
    this.props.save(this.props.form.getFieldsValue());
},

render()
{
    const { getFieldProps } = this.props.form;
    const formItemLayout = {
        labelCol: {span: 6},
        wrapperCol: {span: 14},
    };

    return (
        <Form horizontal onSubmit={this.handleSubmit}>
            <row><FormItem
                {...formItemLayout}
                label="id：">
                <p className="ant-form-text" id="_id"
                   name="id" {...getFieldProps('_id')}>{this.props.record._id || null}</p>
            </FormItem></row>
            <row>
                <FormItem
                    {...formItemLayout}
                    label="菜单名称：">
                    <Input placeholder="请输入菜单名称"
                        {...getFieldProps('menuName')} />
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="排序：">
                    <Input placeholder="请输入序号"
                        {...getFieldProps('showOrder')} />
                </FormItem>
            </row>


            <FormItem
                {...formItemLayout}
                label="功能URL：">
                <Input type="textarea" placeholder="请输入功能地址"
                    {...getFieldProps('functionURL')} />
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="说明：">
                <Input type="textarea" placeholder="请输入说明"
                    {...getFieldProps('description')} />
            </FormItem>
            <Button type="primary" htmlType="submit">保存</Button>
        </Form>
    );
}
})
;

FormComponent = Form.create()(FormComponent);

export default FormComponent;