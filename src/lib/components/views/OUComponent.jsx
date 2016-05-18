/**
 * Created by Baggio on 2016/5/16.
 * 组织机构管理父组件
 */
import React from 'react'
import ReactDOM from 'react-dom'
import OUFormComponent from '../OUFormComponent.jsx';
import { Table, Icon, Col, Row, Input,Popconfirm,Button} from 'antd';
import MenuTableComponent from '../MenuTableComponent.jsx';
import OUBreadcrumbComponent from '../OUBreadcrumbComponent.jsx';
import reqwest from 'reqwest';
import classNames from 'classnames';
var OUComponent = React.createClass({
    getInitialState() {
        return {
            path: '组织机构/',
            record: {},
            visible: false,
            pagination: {}

        }

    },

    componentDidMount() {

        this.fetch();
    },
    //导航点击
    handleBreadcrumbClick(path){
        this.params.treeNode = path
        this.setState({path: path});
        this.fetch();
    },
    //菜单名称点击
    clickMenuName(record){
        this.params.treeNode = record.path + record.OUName + '/';
        this.setState({path: record.path + record.OUName + '/'});
        this.fetch();

    },
    params: {
        limit: 10,
        index: 1,
        sortField: '',
        sortOrder: '',
        findField: '',
        treeNode: '组织机构/'
    },
    handleTableChange(pagination, filters, sorter) {
        const pager = this.state.pagination;
        this.currentPage = pagination.current;
        this.params.limit = pagination.pageSize;
        this.params.index = (pagination.current - 1) * pagination.pageSize + 1,
            pager.current = pagination.current;
        this.setState({
            pagination: pager
        });
        for (let key in filters) {
            if (filters.hasOwnProperty(key)) {
                params[key] = filters[key];
            }
        }
        this.fetch(this.params);
    },
    fetch(params = {}) {
        reqwest({
            url: '../api/OUManagement',
            method: 'post',
            data: {
                action: 'getList',
                index: this.params.index,
                limit: this.params.limit,
                sortField: this.params.sortField,
                sortOrder: this.params.sortOrder,
                findField: this.params.findField,
                treeNode: this.params.treeNode
            },
            type: 'json',
            success: (result) => {
                const pagination = this.state.pagination;
                pagination.total = result.result.retval.totalCount;
                this.setState({
                    loading: false,
                    visible: false,
                    data: result.result.retval.data,
                    pagination,
                })
            }

        });
    },
//表单定义
    columns: [
        {
            title: '序号',
            dataIndex: 'showOrder',
            key: 'showOrder',
            width: 50
        },
        {
            title: '组织机构名称',
            dataIndex: 'OUName',
            key: 'OUName',
            render(text, record) {
                return <a href="javascript:void(0)" onClick={this.clickMenuName.bind(this,record)}>{text}</a>;
            }
        }, {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            width: 100
        },
        {
            title: '操作',
            dataIndex: 'formOperation',
            key: 'formOperation',
            width: 100,
            render(text, record) {
                return (
                    <span>
                     <a href="#" onClick={this.editContent.bind(this,record)}>编辑</a>
                     <span className="ant-divider"></span>
                     <Popconfirm placement="left" title="该组织机构可能包含子组织机构和人员，确认删除吗？"
                                 onConfirm={this.deleteConfirm.bind(this,record)}
                                 onCancel={this.deleteCancel}>
                         <a href="#">删除</a>
                     </Popconfirm>
                     <span className="ant-divider"></span>
                 </span>
                );
            }
        }
    ],
//编辑方法
    editContent(record){
        this.showModal();
        this.setState({
            record: record
        });
    },
    showModal() {
        this.setState({
            visible: true,
            record:{}
        })
    },
//删除方法
    deleteConfirm(record) {
        reqwest({
            url: '../api/OUManagement',
            method: 'post',
            data: {
                action: 'deleteConfirm',
                _id: record._id
            },
            type: 'json',
            success: (result) => {
                var currentPage = this.currentPage || 1;
                this.fetch();
            }
        })

    },
    //删除取消按钮方法
    deleteCancel() {

    },

    //保存方法
    saveForm(item){
        var timeStr = '';
        var curDate = new Date();
        var curYear = curDate.getFullYear();
        var curMonth = curDate.getMonth() + 1;  //获取当前月份(0-11,0代表1月)
        var curDay = curDate.getDate();       //获取当前日(1-31)
        timeStr = curYear + '/' + curMonth + '/' + curDay;
        reqwest({
            url: '../api/OUManagement',
            method: 'post',
            data: {
                action: 'save',
                _id: item._id,
                OUName: item.OUName,
                showOrder: item.showOrder,
                createTime: timeStr,
                path: this.state.path
            },
            type: 'json',
            success: (result) => {
                this.fetch();
            }

        });

    },
    render()

    {
        //改变column.render的作用域
        for (var column of this.columns) {
            if (column.render) {
                column.render = column.render.bind(this)
            }

        }
        return (<div>
            <Row type="flex" justify="center" align="top">
                <Col span="">
                    <h1>组织机构管理</h1>
                </Col>
            </Row>
            <Button type="primary" onClick={this.showModal}>新增组织机构</Button>
            <OUFormComponent saveForm={this.saveForm} record={this.state.record} visible={this.state.visible}/>
            <OUBreadcrumbComponent handleClick={this.handleBreadcrumbClick} path={this.state.path}/>
            <MenuTableComponent data={this.state.data} onChange={this.handleTableChange}
                                pagination={this.state.pagination} columns={this.columns}/>

        </div>)
    }

})
export default OUComponent;