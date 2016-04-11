﻿import ReactDOM from 'react-dom';
import React from 'react';
import { Table, Popconfirm } from 'antd';
import Tablecomponent from './../tableComponent.jsx';
import reqwest from 'reqwest';
import { browserHistory } from 'react-router'

const Formtable = React.createClass({
    getInitialState() {
        var that = this;
        return {
            columns: [{
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
                width: 100,
                render(text, record){
                    var dates = record.createTime.substr(0, 4) + "-" + record.createTime.substr(5, 2) + "-" + record.createTime.substr(8, 2);
                    return (
                        <span>{dates}</span>
                    )
                }
            }, {
                title: '最后修改时间',
                dataIndex: 'lastmodifyTime',
                width: 100,
                render(text, record){
                    var dates = record.lastmodifyTime.substr(0, 4) + "-" + record.lastmodifyTime.substr(5, 2) + "-" + record.lastmodifyTime.substr(8, 2);
                    return (
                        <span>{dates}</span>
                    )
                }
            }, {
                title: '操作',
                dataIndex: 'formOperation',
                width: 100,
                render(text, record) {
                    var bindObject = {
                        component: this,
                        record: record
                    };
                    return (
                        <span>
                 <a href="#" onClick={that.editContent.bind(that,record)}>编辑</a>
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
        var urlObject = {
            pathname: '/router/iframeComponent',
            query: {url: `../dragform/dragform.html`}
        };
        browserHistory.push(urlObject)
    },
    editContent(record)
    {
        var urlObject = {
            pathname: '/router/iframeComponent',
            query: {url: `../dragform/dragform.html?id=${record._id}`}
        };
        browserHistory.push(urlObject)
    },
    deleteConfirm(de)
    {
        reqwest({
            url: '../api/formManagement',
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
        return (<Tablecomponent columns={this.state.columns} onAdd={this.addEditor}/>)
    }
});

export default Formtable;