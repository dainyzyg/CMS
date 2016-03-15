import ReactDOM from 'react-dom';
import React from 'react';
import { Button, Table, Icon, Col, Row, Input } from 'antd';
import classNames from 'classnames';

//定义搜索框组件
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
            this.props.onSearch();
        }
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
//定义表单组件
const Tablecomponent = React.createClass({
    getInitialState() {
        return {
            data: [],
            pagination: {},
            loading: false,
        };
    },
    handleTableChange(pagination, filters, sorter) {
        const pager = this.state.pagination;
        pager.current = pagination.current;
        this.setState({
            pagination: pager
        });
        const params = {
            pageSize: pagination.pageSize,
            currentPage: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order
        };
        for (let key in filters) {
            if (filters.hasOwnProperty(key)) {
                params[key] = filters[key];
            }
        }
        this.fetch(params);
    },
    //fetch（）获取数据
    fetch(params = {}) {
        console.log('请求参数：', params);
        this.setState({loading: true});
        const data = [];
        for (let i = 1; i <= 30; i++) {
            data.push({
                key: i,
                formId: `工作表单${i}号`,
                formName: `信息化工作平台表单`,
                formDiscription: `工作表单${i}号`,
                formCreatetime: `20160308`,
                formLastmodifytime: `20160308`
            });
        }

        const pagination = this.state.pagination
        this.setState({
            loading: false,
            data: data,
            pagination,
        });
    },
    componentDidMount() {
        this.fetch();
    },
    render() {
        return (
            <div style={{padding:50}}>
                <Row type="flex" justify="center" align="top">
                    <Col span="">
                        <h1>表单配置</h1>
                    </Col>
                </Row>
                <Row style={{marginBottom:5}}>
                    <Col span="8">
                        <Button type="primary">新增编辑器</Button>
                    </Col>
                    <Col span="4" offset="12">
                        <SearchInput placeholder="请输入查询内容" style={{ width: 200 }}/>
                    </Col>
                </Row>
                <Table columns={this.props.columns}
                       dataSource={this.state.data}
                       pagination={this.state.pagination}
                       loading={this.state.loading}
                       onChange={this.handleTableChange}
                       bordered />
            </div>
        );
    }
});
export default Tablecomponent;