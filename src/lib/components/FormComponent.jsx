/**
 * Created by Baggio on 2016/3/30.菜单编辑form
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

    },
    componentDidMount() {
        
    },
    handleSubmit(e) {
        e.preventDefault();
        var formItem={
            _id:this.props.record._id,
            description:this.props.form.getFieldsValue().description,
            menuName:this.props.form.getFieldsValue().menuName,
            showOrder:this.props.form.getFieldsValue().showOrder,
            functionURL:this.props.form.getFieldsValue().functionURL
        };
        console.log('formItem',formItem)
        this.props.save(formItem);


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
                        {...getFieldProps('menuName',{ initialValue: this.props.record.menuName || null})} />
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="排序：">
                    <Input placeholder="请输入序号"
                        {...getFieldProps('showOrder',{ initialValue: this.props.record.showOrder || null})} />
                </FormItem>
            </row>


            <FormItem
                {...formItemLayout}
                label="功能URL：">
                <Input type="textarea" placeholder="请输入功能地址"
                    {...getFieldProps('functionURL',{ initialValue: this.props.record.functionURL || null})} />
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="说明：">
                <Input type="textarea" placeholder="请输入说明"
                    {...getFieldProps('description',{ initialValue: this.props.record.description || null})} />
            </FormItem>
            <Button type="primary" htmlType="submit">保存</Button>
        </Form>
    );
}
})
;

FormComponent = Form.create()(FormComponent);

export default FormComponent;