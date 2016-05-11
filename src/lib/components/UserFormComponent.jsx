/**
 * Created by Baggio on 2016/5/9
 */
import ReactDOM from 'react-dom';
import React from 'react';
import { Modal, Button,Col, Row, Input,Form,DatePicker  } from 'antd';
const FormItem = Form.Item;
let UserFormComponent = React.createClass({
        componentWillReceiveProps: function (nextProps) {
            //console.log('nextProps.record---form',nextProps.record)
            this.setState({
                record: nextProps.record
            });
        },
        componentDidMount() {
            //console.log('form this',this.props)
            //if (this.props.record) {
            //    this.props.form.setFieldsValue({
            //            personName: this.props.record.personName,
            //            userName: this.props.record.userName,
            //            _id: this.props.record._id,
            //        }
            //    )
            //    console.log('this.props.form',this.props.form.getFieldsValue())
            //}

        },
        handleSubmit(e) {
            e.preventDefault();
            var formItem={
                _id:this.props.record._id,
                personName:this.props.form.getFieldsValue().personName,
                userName:this.props.form.getFieldsValue().userName
            };
            console.log('this.props.form', this.props.form.getFieldsValue());
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
                <Form horizontal onSubmit={this.handleSubmit} >
                    <row><FormItem
                        {...formItemLayout}
                        label="id：">
                        <p className="ant-form-text" id="_id"
                           name="id" {...getFieldProps('_id')}>{this.props.record._id || null}</p>
                    </FormItem></row>
                    <row><FormItem
                        {...formItemLayout}
                        label="OUId：">
                        <p className="ant-form-text" id="OUId"
                           name="OUId" {...getFieldProps('OUId')}>{this.props.record.OUId || null}</p>
                    </FormItem></row>
                    <row>
                        <FormItem
                            {...formItemLayout}
                            label="组织机构名称：">
                            <p className="ant-form-text" id="OUName"
                               name="OUname" {...getFieldProps('OUName')}>{this.props.record.OUName || null}</p>
                        </FormItem>
                        </row>
                    <row>
                        <FormItem
                            {...formItemLayout}
                            label="姓名：">
                            <Input placeholder="请输入姓名"
                                {...getFieldProps('personName',{ initialValue: this.props.record.personName || null})} />
                        </FormItem>
                    </row>
                    <FormItem
                        {...formItemLayout}
                        label="用户名：">
                        <Input placeholder="请输入用户名"
                            {...getFieldProps('userName',{ initialValue: this.props.record.userName || null})} />
                    </FormItem>
                    <Button type="primary" htmlType="submit">保存</Button>
                </Form>
            );
        }
    })

UserFormComponent = Form.create()(UserFormComponent);

export default UserFormComponent;