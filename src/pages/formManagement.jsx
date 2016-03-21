import ReactDOM from 'react-dom';
import React from 'react';
import { Table, Popconfirm } from 'antd';
import Tablecomponent from './../lib/components/tableComponent.jsx';
import reqwest from 'reqwest';
//为新增编辑器onClick事件定义方法
function addEditor() {
    window.location.href = '../dragform/dragform.html'
}
//为编辑链接onClick事件定义方法
function editContent() {
    window.location.href = '../dragform/dragform.html?id='+this.record._id
}
//分页信息
const pagination={}
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
    width: 100
}, {
    title: '最后修改时间',
    dataIndex: 'lastmodifyTime',
    width: 100
}, {
    title: '操作',
    dataIndex: 'formOperation',
    width: 100,
    render(text, record) {
        var bindObject={
            component:this,
                record:record
        }
        return (
            <span>
                 <a href="#" onClick={editContent.bind(bindObject)}>编辑</a>
                 <span className="ant-divider"></span>
                 <Popconfirm placement="left" title="确定要删除这个流程吗？" onConfirm={deleteConfirm.bind(bindObject)}
                             onCancel={deleteCancel}>
                     <a href="#">删除</a>
                 </Popconfirm>
                 <span className="ant-divider"></span>
             </span>
        );
    }
}];
//删除方法
function deleteConfirm() {
    reqwest({
        url: '../api/formManagement',
        method: 'post',
        data: {
            action: 'deleteConfirm',
            _id: this.record._id
        },
        type: 'json',
        success: (result) => {
            console.log('component',this.component)
            console.log('pagination',this.component.currentPage)
            var currentPage=this.component.currentPage||1;
            this.component.fetch({
                limit: 10,
                index: (currentPage - 1) * 10 + 1
            });
        }
    })

}

function deleteCancel() {

}

ReactDOM.render(<Tablecomponent onAdd={addEditor}
                                columns={columns}
    />, document.getElementById('react-content'));