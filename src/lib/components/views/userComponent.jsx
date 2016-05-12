/**
 * Created by Baggio on 2016/4/27.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import reqwest from 'reqwest';
import { Button, Table, Icon, Col, Row, Input,Popconfirm,Form} from 'antd';
import TreeComponent from '../TreeComponent.jsx';
import MenuTableComponent from '../MenuTableComponent.jsx';
import UserModalComponent from '../UserModalComponent.jsx';
import classNames from 'classnames';
import './../../../css/holyGrailLayout.css'
var userComponent = React.createClass({
    getInitialState() {
        return {
            path: '组织机构/',
            pagination: {},/*分页参数*/
            visible: false,
            record: {},
            treeData: [],
            buttonContent:'新增用户',
            buttonStyle:{},
            OUName:''
        }

    },
    componentDidMount() {
        this.getTreeData();
        this.fetch();

    },
    params: {
        limit: 10,
        index: 1,
        sortField: '',
        sortOrder: '',
        findField: '',
        OUID: '57201e1b38e2124a0c85c2ed'
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
    //获取组织机构数据
    getTreeData() {
        reqwest({
            url: '../api/userManagement',
            method: 'post',
            data: {
                action: 'getTreeList'
            },
            type: 'json',
            success: (result) => {
                this.setState({
                    treeData: result.result.retval,

                })
            }

        });
    },
    //点击树节点加载人员数据
    treeOnSelect(treeNodeId){
        this.params.OUID = treeNodeId[0];
        //this.setState({OUID:treeNodeId});
        this.fetch();
        this.setState({
            buttonContent:'新增用户',
            buttonStyle:{}
        })

    },

    fetch(params = {}) {
        reqwest(
            {
                url: '../api/userManagement',
                method: 'post',
                data: {
                    action: 'getList',
                    index: this.params.index,
                    limit: this.params.limit,
                    sortField: this.params.sortField,
                    sortOrder: this.params.sortOrder,
                    findField: this.params.findField,
                    OUID: this.params.OUID
                },
                type: 'json',
                success: (result) => {
                    const pagination = this.state.pagination;
                    pagination.total = result.result.retval.totalCount;
                    this.setState({
                        loading: false,
                        visible: false,
                        data: result.result.retval.data,
                        OUName:result.result.retval.OUName,
                        pagination:pagination,
                        record:{
                            OUName:result.result.retval.OUName,
                            OUId:this.params.OUID
                        }
                    })

                }

            });
    },


//表单定义
    columns: [
        {
            title: '组织机构名称',
            dataIndex: 'OUName',
            key:'OUName',

        },
        {
            title: '姓名',
            dataIndex: 'personName',
            key:'personName',
        },
        {
            title: '用户名',
            dataIndex: 'userName',
            key:'userName',
        },
        {
            title: '操作',
            dataIndex: 'formOperation',
            key:'formOperation',
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
        this.setState({
            record: record
        });



    },
//删除方法
    deleteConfirm(record) {
        reqwest({
            url: '../api/userManagement',
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
        //var timeStr = '';
        //var curDate = new Date();
        //var curYear = curDate.getFullYear();
        //var curMonth = curDate.getMonth() + 1;  //获取当前月份(0-11,0代表1月)
        //var curDay = curDate.getDate();       //获取当前日(1-31)
        //timeStr = curYear + '/' + curMonth + '/' + curDay;
        reqwest({
            url: '../api/userManagement',
            method: 'post',
            data: {
                action: 'save',
                _id: item._id,
                userName: item.userName,
                personName: item.personName,
                OUId:this.params.OUID,
                passWord:'111'

            },
            type: 'json',
            success: (result) => {
                this.fetch();
            }

        });

    },
    showModal() {
        if (this.params.OUID) {
            this.setState({
                visible: true,
                buttonContent:'新增用户',
                buttonStyle:{},
                record:{}
            });
        }else
        {
               this.setState({
                   buttonContent:(<div><Icon style={{color:'rgb(255,170,0)'}} type="exclamation-circle-o" /><span style={{color:'#666'}}> 请选择要添加用户的组织机构</span></div>),
                   buttonStyle:{backgroundColor:'#fff7e6',borderColor:'#fec'},

               })
        }


    },
    render() {
        //改变column.render的作用域
        for (var column of this.columns) {
            if (column.render) {
                column.render = column.render.bind(this)
            }

        }
        return (
            <div style={{padding:50}} className="userComponent">
                <div className="background">
                    <div className="holyGrailLayout">
                        <div className="title">
                            <Row type="flex" justify="center" align="top">
                                <Col span="">
                                    <h1>用户管理</h1>
                                </Col>
                            </Row>
                        </div>
                        <div className="center">
                            <div className="navigator"><TreeComponent onSelect={this.treeOnSelect}
                                                                      treeData={this.state.treeData}/></div>
                            <div className="content">

                                <Button style={this.state.buttonStyle} type='primary' onClick={this.showModal}>{this.state.buttonContent}</Button>
                                <UserModalComponent saveForm={this.saveForm} visible={this.state.visible}
                                                    record={this.state.record} modalTitle='编辑用户'/>
                                <MenuTableComponent data={this.state.data} onChange={this.handleTableChange} pagination={this.state.pagination} columns={this.columns}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})
export default userComponent;