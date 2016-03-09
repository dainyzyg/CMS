﻿import React from 'react';
import { Button, Table, Icon } from 'antd';

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

ReactDOM.render(<Table columns={columns} dataSource={data} pagination={pagination} bordered/>
    , document.getElementById('react-content')
);
/*ReactDOM.render(
 <div>
 <Row type="flex" justify="center" align="top">
 <Col span="">
 <h1>表单配置界面</h1>
 </Col>
 </Row>
 <Row>
 <Col span="8">
 <Button type="primary" size="large">新增编辑器</Button>
 </Col>
 <Col span="8" offset="8">
 <Input id="largeInput" size="large" placeholder="请输入查询内容"/>
 <Button type="primary" shape="circle" size="large">
 <Icon type="search"/>
 </Button>
 </Col>
 </Row>
 </div>,
 document.getElementById('react-content')
 )*/