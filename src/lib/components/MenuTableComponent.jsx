/**
 * Created by Baggio on 2016/3/24.
 */
import ReactDOM from 'react-dom';
import React from 'react';
import { Table } from 'antd';
import reqwest from 'reqwest';



const MenuTableComponent = React.createClass({
    getInitialState() {
        return {
            data: [],
            pagination: {},
            loading: false,
        };
    },

    render() {
       // var data
       //this.params.treeNode=this.props.path
       // data=this.fetch(this.params)
       // console.log('111111',data.then)

        return (
            <Table columns={this.props.columns}
                   dataSource={this.props.data}
                   pagination={this.state.pagination}
                   loading={this.state.loading}
                   onChange={this.handleTableChange} />
        );
    }
});

export default MenuTableComponent;