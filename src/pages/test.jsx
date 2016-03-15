import ReactDOM from 'react-dom';
import React from 'react';
import { Table, Modal } from 'antd';
import Tablecomponent from './../lib/components/tableComponent.jsx'

//为删除确认定义方法
const confirm = Modal.confirm;
function showConfirm() {
    confirm({
        title: '确认需要删除这项内容？',
        onOk() {
            console.log('确定');
        },
        onCancel() {
        }
    });
}
//定义表头
const columns = [{
    title: '表单ID',
    dataIndex: 'formId',
    width: 120,
    render(text) {
        return <a href="#">{text}</a>;
    }
}, {
    title: '表单名称',
    dataIndex: 'formName'
}, {
    title: '表单描述',
    dataIndex: 'formDiscription'
}, {
    title: '创建时间',
    dataIndex: 'formCreatetime',
    width: 100
}, {
    title: '最后修改时间',
    dataIndex: 'formLastmodifytime',
    width: 100
}, {
    title: '操作',
    dataIndex: 'formOperation',
    width: 100,
    render() {
        return (
            <span>
                 <a href="#">添加</a>
                 <span className="ant-divider"></span>
                 <a href="#" onClick={showConfirm}>删除</a>
                 <span className="ant-divider"></span>
             </span>
        );
    }
}];

ReactDOM.render(<Tablecomponent columns={columns}/>, document.getElementById('react-content'));