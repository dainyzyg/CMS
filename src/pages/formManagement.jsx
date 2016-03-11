import ReactDOM from 'react-dom';
import React from 'react';
import { Button, Table, Icon, Col, Row, Input } from 'antd';
import classNames from 'classnames';

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
                                       onFocus={this.handleFocusBlur} onBlur={this.handleFocusBlur} />
                <div className="ant-input-group-wrap">
                    <Button className={btnCls} onClick={this.handleSearch}>
                        <Icon type="search" />
                    </Button>
                </div>
            </InputGroup>
        );
    }
});

const columns = [{
    title: '表单ID',
    dataIndex: 'formId',
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
    dataIndex: 'formCreatetime'
}, {
    title: '最后修改时间',
    dataIndex: 'formLastmodifytime'
},
    {
        title: '操作',
        dataIndex: 'formOperation',
        render() {
            return (
                <span>
 <a href="#">添加</a>
 <span className="ant-divider"></span>
 <a href="#">删除</a>
 <span className="ant-divider"></span>
 </span>
            );
        }
    }
];

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

const pagination = {
    total: data.length,
    current: 1,
    showSizeChanger: true,
    onShowSizeChange(current, pageSize) {
        console.log('Current: ', current, '; PageSize: ', pageSize);
    },
    onChange(current) {
        console.log('Current: ', current);
    }
};

ReactDOM.render(
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
                <SearchInput placeholder="请输入查询内容" style={{ width: 200 }} />
            </Col>
        </Row>
        <Table columns={columns} dataSource={data} pagination={pagination} bordered/>
    </div>,
    document.getElementById('react-content')
);