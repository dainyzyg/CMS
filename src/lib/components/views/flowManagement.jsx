import ReactDOM from 'react-dom';
import React from 'react';
import { Table, Popconfirm } from 'antd';
import Flowcomponent from './../flowComponent.jsx';
import reqwest from 'reqwest';
import { browserHistory } from 'react-router'

const Flowtable = React.createClass({
    getInitialState() {
        var that = this
        return {
            columns = [{
                title: '表单ID',
                dataIndex: '_id',
                width: 120
            }, {
                title: '表单名称',
                dataIndex: 'flowName',
                width: 200
            }, {
                title: '表单',
                dataIndex: 'flow',
            },
                {
                    title: '创建时间',
                    dataIndex: 'createTime',
                    width: 100
                }, {
                    title: '流程类型',
                    dataIndex: 'type',
                    width: 100
                }, {
                    title: '操作',
                    dataIndex: 'formOperation',
                    width: 200,
                render(text, record) {
                    var bindObject = {
                        component: this,
                        record: record
                    }
                    return (
                        <span>
                            <a href="#">发起</a>
                <span className="ant-divider"></span>
                 <a href="#" onClick={that.editContent.bind(that,bindObject)}>编辑</a>
                 <span className="ant-divider"></span>
                 <Popconfirm placement="left" title="确定要删除这个流程吗？" onConfirm={that.deleteConfirm.bind(that,bindObject)}
                             onCancel={that.deleteCancel}>
                     <a href="#">删除</a>
                 </Popconfirm>
                 <span className="ant-divider"></span>
             </span>
                    );
                }
            }]
        }
    },
    componentDidMount() {
    },
    addEditor() {
        browserHistory.push('/router/iframeContent')
    },
    editContent(ed)
    {
        window.location.href = '../dragform/dragform.html?id=' + ed.record._id
    },
    deleteConfirm(de)
    {
        reqwest({
            url: '../api/flowManagement',
            method: 'post',
            data: {
                action: 'deleteConfirm',
                _id: de.record._id
            },
            type: 'json',
            success: (result) => {
                //console.log('component',this.component)
                //console.log('pagination',this.component.currentPage)
                var currentPage = de.component.currentPage || 1;
                de.component.fetch({
                    limit: 10,
                    index: (currentPage - 1) * 10 + 1
                });
            }
        })
    }
    ,
    deleteCancel()
    {
    }
    ,
    render()
    {
        return (<Flowcomponent columns={this.state.columns} onAdd={this.addEditor}/>)
    }
})

export default Flowtable;