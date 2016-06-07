import ReactDOM from 'react-dom';
import React from 'react';
import { Button, Table, Icon, Col, Row, Input,Pagination  } from 'antd';
import classNames from 'classnames';
import reqwest from 'reqwest';

function onShowSizeChange(current, pageSize) {
    console.log(current, pageSize);
}
const Dispatchtable = React.createClass({
    getInitialState() {
        return {
            data: [],
            pagination: {pageSize:6},
            loading: false
        };
    },
    params: {
        limit: 6,
        index: 1,
        sortField: '',
        sortOrder: '',
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
      /*  for (let key in filters) {
            if (filters.hasOwnProperty(key)) {
                params[key] = filters[key];
            }
        }*/
        this.fetch();
    },
//fetch（）获取数据
    fetch()
    {
        this.setState({loading: true});
        var user = JSON.parse(localStorage.userInfo);


        console.log(user.userId);
        reqwest({
            url: '../api/dispatch',
            method: 'post',
            data: {
                action: 'getList',
                index: this.params.index,
                limit: this.params.limit,
                userId:user.userId,
                sortField: this.params.sortField,
                sortOrder: this.params.sortOrder,
            },
            type: 'json',
            success: (result) => {
                const pagination = this.state.pagination;
                pagination.total = result.result.retval.totalCount;
                this.setState({
                    loading: false,
                    data: result.result.retval.data,
                    pagination
                });
            }
        });
    },
    componentDidMount() {
        this.fetch();
    },
    render() {
        for (var column of this.props.columns) {
            if (column.render) {
                column.render = column.render.bind(this)
            }
        }

        return (
            <div>
                <Row type="flex" justify="center">
                    <Col span="22">
                        <Table size="middle"
                            columns={this.props.columns}
                               dataSource={this.state.data}
                               pagination={this.state.pagination}
                               loading={this.state.loading}
                               onChange={this.handleTableChange}
                               bordered/>
                    </Col>
                </Row>
            </div>
        );
    }
});
export default Dispatchtable;
