import ReactDOM from 'react-dom';
import React from 'react';
import { Menu, Icon} from 'antd';
import '../../css/fmLayout.css';

const SubMenu = Menu.SubMenu;
const Frontpage = React.createClass({
    getInitialState() {
        return {
        };
    },
    render() {
        return (
            <div>
                <div className="ant-layout-header">
                    <img src='../images/logo.jpg'style={{float:'left',height:'63px'}}/>
                    <Menu mode="horizontal" style={{float:'right',marginTop:'16px'}}>
                        <Menu.Item><Icon type="question"/>系统帮助</Menu.Item>
                        <Menu.Item><Icon type="notification"/>系统消息</Menu.Item>
                        <Menu.Item><Icon type="logout"/>系统注销</Menu.Item>
                    </Menu>
                </div>
                <div>
                    <div className="ant-layout-container">
                        <aside className="ant-layout-sider">
                            <Menu mode="inline" defaultOpenKeys={['sub1']}>
                                <SubMenu key="sub1" title={<span><Icon type="user" />导航一</span>}>
                                    <Menu.Item>选项1</Menu.Item>
                                    <Menu.Item>选项2</Menu.Item>
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
                            <div style={{ height: 240 }}>
                                <div style={{clear: 'both'}}>内容区域</div>
                            </div>
                        </div>
                    </div>
                    <div className="ant-layout-footer">
                        Ant Design 版权所有 © 2015 由蚂蚁金服体验技术部支持
                    </div>
                </div>
            </div>
        );
    }
});

export default Frontpage;