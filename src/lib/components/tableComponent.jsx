import ReactDOM from 'react-dom';
import React from 'react';
import { Button, Table, Icon, Col, Row, Input } from 'antd';
import classNames from 'classnames';
import reqwest from 'reqwest';
const InputGroup = Input.Group;
const SearchInput = React.createClass({
    getInitialState() {
        return {
            value: '',
            focus: false
        };
    },
    handleInputChange(e) {
        this.setState({
            value: e.target.value,
        });
    },
    handleFocusBlur(e) {
        this.setState({
            focus: e.target === document.activeElement,
        });
    },
    handleSearch() {
        if (this.props.onSearch) {
            this.props.onSearch(this.state.value);
        }

        //console.log('value',this.state.value);
    },
    render() {
        const btnCls = classNames({
            'ant-search-btn': true,
            'ant-search-btn-noempty': !!this.state.value.trim(),
        });
        const searchCls = classNames({
            'ant-search-input': true,
            'ant-search-input-focus': this.state.focus,
        });
        return (
            <InputGroup className={searchCls} style={this.props.style}>
                <Input {...this.props} value={this.state.value} onChange={this.handleInputChange}
                                       onFocus={this.handleFocusBlur} onBlur={this.handleFocusBlur}/>

                <div className="ant-input-group-wrap">
                    <Button className={btnCls} onClick={this.handleSearch}>
                        <Icon type="search"/>
                    </Button>
                </div>
            </InputGroup>
        );
    }
});
const Tablecomponent = React.createClass({
    getInitialState() {
        return {
            data: [],
            pagination: {},
            loading: false,
        };
    },
    params:{
        limit:10,
        index:1,
        sortField:'',
        sortOrder:'',
        findField:''
    },
    handleTableChange(pagination, filters, sorter) {
        const pager = this.state.pagination;
        this.currentPage=pagination.current;
        this.params.limit=pagination.pageSize;
        this.params.index= (pagination.current - 1) * pagination.pageSize + 1,
        pager.current = pagination.current;
        this.setState({
            pagination: pager
        });
        //const params = {
        //    limit: pagination.pageSize,
        //    index: (pagination.current - 1) * pagination.pageSize + 1,
        //    sortField: sorter.field,
        //    sortOrder: sorter.order
        //};
        for (let key in filters) {
            if (filters.hasOwnProperty(key)) {
                params[key] = filters[key];
            }
        }
        this.fetch();
    },
    onSearch(e){
        console.log('search:',e);
        this.params.findField=e;
        this.params.index=1;
        this.params.limit=10;
        this.fetch();
    },
//fetch（）获取数据
    fetch()
    {
        this.setState({loading: true});
        reqwest({
            url: '../api/formManagement',
            method: 'post',
            data: {
                action: 'getList',
                index: this.params.index,
                limit: this.params.limit,
                sortField:this.params.sortField,
                sortOrder:this.params.sortOrder,
                findField:this.params.findField
            },
            type: 'json',
            success: (result) => {
                console.log('result:',result);
                const pagination = this.state.pagination;
                pagination.total = result.result.retval.totalCount;
                this.setState({
                    loading: false,
                    data: result.result.retval.data,
                    pagination,
                });
            }
        });
    },
    componentDidMount() {
        this.fetch();
    },
        render() {
            //var columns=this.props.columns;
            for(var column of this.props.columns){
                if(column.render)
                {
                    column.render=column.render.bind(this)
                }

            }
            //this.props.columns[5].render=this.props.columns[5].render.bind(this)

        return (
            <div style={{padding:50}}>
                <Row type="flex" justify="center" align="top">
                    <Col span="">
                        <h1>表单配置</h1>
                    </Col>
                </Row>
                <Row style={{marginBottom:5}}>
                    <Col span="8">
                        <Button type="primary" onClick={this.props.onAdd}>新增编辑器</Button>
                    </Col>
                    <Col span="4" offset="12">
                        <SearchInput placeholder="请输入查询内容" onSearch={this.onSearch} style={{ width: 200 }}/>
                    </Col>
                </Row>
                <Table columns={this.props.columns}
                       dataSource={this.state.data}
                       pagination={this.state.pagination}
                       loading={this.state.loading}
                       onChange={this.handleTableChange}
                       bordered/>
            </div>
        );
    }
});
export default Tablecomponent;
