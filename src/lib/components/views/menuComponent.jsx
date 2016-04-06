import React from 'react'
import ReactDOM from 'react-dom'
import reqwest from 'reqwest';
import { Button, Table, Icon, Col, Row, Input,Popconfirm} from 'antd';
import BreadcrumbComponent from '../breadcrumbComponent.jsx';
import MenuTableComponent from '../MenuTableComponent.jsx';
import ModalComponent from '../ModalComponent.jsx';
import classNames from 'classnames';
var MenuComponent = React.createClass({
    getInitialState() {
        return {path: '菜单/',
            visible:false,
            record:{}

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
        this.params.treeNode = record.path + record.menuName + '/';
        this.setState({path: record.path + record.menuName + '/'});
        this.fetch();

    },
    params: {
        limit: 10,
        index: 1,
        sortField: '',
        sortOrder: '',
        findField: '',
        treeNode: '菜单/'
    },
    handleTableChange(pagination, filters, sorter) {
        const pager = this.state.pagination;
        pager.current = pagination.current;
        this.setState({
            pagination: pager
        });
        for (let key in filters) {
            if (filters.hasOwnProperty(key)) {
                params[key] = filters[key];
            }
        }
        this.fetch(params);
    },
    fetch(params = {}) {
        reqwest({
            url: '../api/menuManagement',
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
                //pagination.total = result.result.retval.totalCount;
                this.setState({
                    loading: false,
                    visible: false,
                    total: result.result.retval.totalCount,
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
            dataIndex: 'showOrder'
        },
        {
            title: '表单ID',
            dataIndex: '_id',
            width: 120
        }, {
            title: '菜单名称',
            dataIndex: 'menuName',
            render(text, record) {
                return <a href="javascript:void(0)" onClick={this.clickMenuName.bind(this,record)}>{text}</a>;
            }
        }, {
            title: '菜单说明',
            dataIndex: 'description'
        }, {
            title: '创建时间',
            dataIndex: 'createTime',
            width: 100
        },
            {
            title: '操作',
            dataIndex: 'formOperation',
            width: 100,
            render(text, record) {
                return (
                    <span>
                     <a href="#" onClick={this.editContent.bind(this,record)}>编辑</a>
                     <span className="ant-divider"></span>
                     <Popconfirm placement="left" title="确定要删除这个菜单吗？" onConfirm={this.deleteConfirm.bind(this,record)}
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
        console.log('record',record);
        this.setState({
            record: record
        });


    },
//删除方法
    deleteConfirm(record) {
        reqwest({
            url: '../api/menuManagement',
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

    deleteCancel() {

    },
    //保存方法
    saveForm(item){
        var timeStr = '';
        var curDate = new Date();
        var curYear = curDate.getFullYear();
        var curMonth = curDate.getMonth()+1;  //获取当前月份(0-11,0代表1月)
        var curDay = curDate.getDate();       //获取当前日(1-31)
        timeStr=curYear+'/'+curMonth+'/'+curDay;
        console.log('item',item);
        reqwest({
            url: '../api/menuManagement',
            method: 'post',
            data: {
                action: 'save',
                _id:item._id,
                menuName:item.menuName,
                functionURL:item.functionURL,
                description:item.description,
                showOrder:item.showOrder,
                createTime:timeStr,
                path:this.state.path
            },
            type: 'json',
            success: (result) => {
                this.fetch();
            }

        });

    },
    showModal() {

        this.setState({
            visible: true,
            record:{}
        });
        console.log('showModal11111',this.state.record)
    },
    render() {
        //改变column.render的作用域
        for (var column of this.columns) {
            if (column.render) {
                column.render = column.render.bind(this)
            }

        }
        return (
            <div style={{padding:50}} className="MenuComponent">
                <Row type="flex" justify="center" align="top">
                    <Col span="">
                        <h1>菜单管理</h1>
                    </Col>
                </Row>
                <Button type="primary" onClick={this.showModal}>新增菜单</Button>
                <ModalComponent saveForm={this.saveForm} visible={this.state.visible} record={this.state.record}/>
                <BreadcrumbComponent handleClick={this.handleBreadcrumbClick} path={this.state.path}/>
                <MenuTableComponent data={this.state.data} columns={this.columns}/>


            </div>

        )
    }
})
export default MenuComponent;