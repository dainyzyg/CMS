import ReactDOM from 'react-dom';
import React from 'react';
import { Table,Collapse,Calendar,Row,Col,Carousel,Badge,Timeline,Popconfirm   } from 'antd';
import Flowcomponent from './../dispatchComponent.jsx';
import reqwest from 'reqwest';
import { browserHistory } from 'react-router'



const Dispatchtable = React.createClass({
    getInitialState() {
        var that = this;
        return {
            columns: [{
                title: '名称',
                dataIndex: 'title',
                render(text) {
                    return <a href="#">{text}</a>;
                },

                width: 100
            }, {
                title: '类型',
                dataIndex: 'type',
                width: 100
            },
                {
                    title: '时间',
                    dataIndex: 'createTime',
                    width: 100,
                    render(text, record){
                        var dates = record.createTime.substr(0, 4) + "-" + record.createTime.substr(5, 2) + "-" + record.createTime.substr(8, 2)
                        return (
                            <span>{dates}</span>
                        )
                    }
                }, {
                    title: '待办人',
                    dataIndex: 'person',
                    width: 100
                }, {
                    title: '状态',
                    dataIndex: 'state',
                    width: 100,
                }
            ]
        }
    },
    render()
    {

       return (<Flowcomponent columns={this.state.columns}/>)
    }
});
export default Dispatchtable;