import React from 'react'
import { Link } from 'react-router'
import { Menu, Icon } from 'antd'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import './../../../css/fmLayout.css';
import './../../../css/homePageTransition.css'

const SubMenu = Menu.SubMenu;
const Frontpage = React.createClass({
    getInitialState() {
        return {
            current: '1',
            openKeys: ['sub1']
        };
    },
    handleClick(e) {
    },
    onToggle(info) {
        this.setState({
            openKeys: info.open ? info.keyPath : info.keyPath.slice(1)
        });
    },
    onSelect(item, key, selectedKeys) {
    },
    render() {
        return (
            <div>
                <div className="ant-layout-header">
                    <img src='../images/logo.jpg' style={{ float: 'left', height: '63px' }}/>
                    <Menu mode="horizontal" style={{ float: 'right', marginTop: '16px' }}>
                        <Menu.Item><Icon type="question"/>系统帮助</Menu.Item>
                        <Menu.Item><Icon type="notification"/>系统消息</Menu.Item>
                        <Menu.Item><Icon type="logout"/>系统注销</Menu.Item>
                    </Menu>
                </div>
                <div>
                    <div className="ant-layout-container">
                        <aside className="ant-layout-sider">
                            <Menu mode="inline" defaultOpenKeys={['sub1']}
                                  onClick={this.handleClick}
                                  openKeys={this.state.openKeys}
                                  onOpen={this.onToggle}
                                  onClose={this.onToggle}
                                  selectedKeys={[this.props.location.pathname]}
                                  onSelect={this.onSelect}>
                                <SubMenu key="sub1" title={<span><Icon type="user" />导航一</span>}>
                                    <Menu.Item key="/router/formManagement">
                                        <Link to="/router/formManagement">表单管理</Link>
                                    </Menu.Item>
                                    <Menu.Item key="/router/flowTable">
                                        <Link to="/router/flowTable">流程管理</Link>
                                    </Menu.Item>
                                    <Menu.Item>选项3</Menu.Item>
                                    <Menu.Item>选项4</Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub2" title={<span><Icon type="laptop" />导航二</span>}>
                                    <Menu.Item>选项5</Menu.Item>
                                    <Menu.Item>选项6</Menu.Item>
                                    <Menu.Item>选项7</Menu.Item>
                                    <Menu.Item>选项8</Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub3" title={<span><Icon type="notification" />导航三</span>}>
                                    <Menu.Item>选项9</Menu.Item>
                                    <Menu.Item>选项10</Menu.Item>
                                    <Menu.Item>选项11</Menu.Item>
                                    <Menu.Item>选项12</Menu.Item>
                                </SubMenu>
                            </Menu>
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

export default Frontpage;