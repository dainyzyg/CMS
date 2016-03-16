import ReactDOM from 'react-dom';
import React from 'react';
import { Table, Popconfirm, Modal, Alert} from 'antd';
import Tablecomponent from './../lib/components/tableComponent.jsx';
import reqwest from 'reqwest';
//为删除确认定义方法
const confirm = Modal.confirm;
function deleteConfirm() {
    console.log('id',this._id)
    confirm({
        title: '确认需要删除这项内容？',
        onOk:()=> {

            reqwest({
                url: '../api/formManagement',
                method: 'post',
                data:{
                    action: 'deleteConfirm',
                    _id: this._id
                },
                type: 'json',
                success: (result) => {
                    //const pagination = this.state.pagination;
                    //pagination.total = result.retval.totalCount;
                    //this.setState({
                    //    loading: false,
                    //    data: result.retval.data,
                    //    pagination,
                    }})
            console.log('确定');
                },

        onCancel() {
        }
    });
}
//为新增编辑器onClick事件定义方法
function addEditor(){
    window.location.href='../dragform/dragform.html'
}
//为编辑链接onClick事件定义方法
function editContent(){
    window.location.href='../dragform/dragform.html'
}
//定义表头
const columns = [{
    title: '表单ID',
    dataIndex: '_id',
    width: 120
}, {
    title: '表单名称',
    dataIndex: 'formName'
}, {
    title: '表单描述',
    dataIndex: 'discription'
}, {
    title: '创建时间',
    dataIndex: 'createTime',
    width:100
}, {
    title: '最后修改时间',
    dataIndex: 'lastmodifyTime',
    width:100
}, {
    title: '操作',
    dataIndex: 'formOperation',
    width: 100,
    render(text, record) {
        return (
            <span>
                 <a href="#" onClick={editContent}>编辑</a>
                 <span className="ant-divider"></span>
                 <a href="#" onClick={deleteConfirm.bind(record)}>删除</a>
                 <Popconfirm placement="left" title="确定要删除这条数据吗？">
                     <a href="#">删除</a>
                 </Popconfirm>
                 <span className="ant-divider"></span>
             </span>
        );
    }
}];

ReactDOM.render(<Tablecomponent onAdd={addEditor} columns={columns}/>, document.getElementById('react-content'));