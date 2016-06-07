import React from 'react'
import { Link, browserHistory } from 'react-router'
import { Menu, Icon,Row,Col,Calendar } from 'antd'
import reqwest from 'reqwest'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import LoginComponent from './loginComponent.jsx';
import FrontpageMenuComponent from './frontpageMenuComponent.jsx'
import './../../../css/fmLayout.css';
import './../../../css/homePageTransition.css'
import './../../../css/homePage.css'
import Tablecomponent from './home.jsx';

const SubMenu = Menu.SubMenu;
const Frontpage = React.createClass({
    getInitialState() {
        return {
            current: '1',
            openKeys: ['sub1'],
            data: []
        };
    },
    fetch(){
        reqwest({
            url: '../api/loginManagement',
            method: 'post',
            data: {
                action: 'getMenu'
            },
            type: 'json',
            success: (result) => {
                console.log('result', result);
                this.setState({
                    data:result.result.retval
                });
            }
        })
    },
    logout(){
        delete localStorage.userInfo;
        browserHistory.push('/router');
    },
    componentDidMount() {
        this.fetch();
    },
    render() {
        if (!localStorage.userInfo) {
            return (
                <LoginComponent />
            );
        }
        else {
            return (
                <div>
                    <div className="ant-layout-header">
                        <img src='../images/logo.jpg' style={{ float: 'left', height: '63px' }}/>

                        <div className="ant-layout-naviRight" onClick={this.logout}>
                            <Icon type="logout" style={{marginRight:"6px"}}/>
                            <span>系统注销</span>
                        </div>
                        <div className="ant-layout-naviRight">
                            <Icon type="notification" style={{marginRight:"6px"}}/>
                            <span>系统消息</span>
                        </div>
                        <div className="ant-layout-naviRight">
                            <Icon type="question" style={{marginRight:"6px"}}/>
                            <span>系统帮助</span>
                        </div>
                    </div>
                    <div>
                        <div className="ant-layout-container">
                            <aside className="ant-layout-sider">
                                <FrontpageMenuComponent data={this.state.data} />
                            </aside>
                            <div className="ant-layout-content">
                                <div>
                                    <div style={{ clear: 'both' }}>
                                        <ReactCSSTransitionGroup
                                            component="div"
                                            transitionName="example"
                                            transitionEnterTimeout={500}
                                            transitionLeaveTimeout={500}
                                            >
                                            {React.cloneElement(this.props.children || (
                                                    <div className='component'>个人首页</div>), {
                                                key: this.props.location.pathname
                                            }) }
                                        </ReactCSSTransitionGroup>
                                        <div>
                                            <Row className="testRowClassName">
                                                <Col span="24">
                                                    <Tablecomponent />
                                                </Col>

                                            </Row>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
});

export default Frontpage;