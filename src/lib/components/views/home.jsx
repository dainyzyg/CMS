import ReactDOM from 'react-dom';
import React from 'react';
import { Table,Collapse,Calendar,Row,Col,Carousel,Badge,Timeline   } from 'antd';
import './../../../css/homePage.css'
import Dispatchtable from './../dispatchComponent.jsx';
import CalendarComponent from './../CalendarComponent.jsx';



const HomePage = React.createClass({
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
                },  {
                    title: '状态',
                    dataIndex: 'state',
                    width: 100,
                }
            ]
        }
    },
    render(){
        return (
            <div>
                <Row className="testRowClassName">
                    <Col span="12">
                        <Dispatchtable columns={this.state.columns}/>
                    </Col>
                    <Col span="12" className="testColClassName"><CalendarComponent/></Col>
                </Row>
            </div>)
    }
});
export default HomePage;

