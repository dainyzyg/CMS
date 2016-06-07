/*globals COURSES:true */
import React from 'react'
import { Link } from 'react-router'
import { Menu, Icon } from 'antd'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import './../../../css/homePageTransition.css'

const SubMenu = Menu.SubMenu
const Sider = React.createClass({
    getInitialState() {
        return {
            current: '1',
            openKeys: ['sub1']
        };
    },
    handleClick(e) {
        // console.log('click ', e);
        // this.setState({
        //     current: e.key,
        //     openKeys: e.keyPath.slice(1)
        // });
    },
    onToggle(info) {
        //console.log(info)
        this.setState({
            openKeys: info.open ? info.keyPath : info.keyPath.slice(1)
        });
    },
    onSelect(item, key, selectedKeys) {
        //console.log(item, key, selectedKeys)
    },
    render() {
        //console.log(this.props.location.pathname)
        //console.log(this.props.history.isActive('/router/test1'))
        return (
            <Menu onClick={this.handleClick}
                style={{ width: 240 }}
                openKeys={this.state.openKeys}
                onOpen={this.onToggle}
                onClose={this.onToggle}
                selectedKeys={[this.props.location.pathname]}
                onSelect={this.onSelect}
                mode="inline">
                <SubMenu key="sub1" title={<span><Icon type="mail" /><span>导航一1</span></span>}>
                    <Menu.Item key="/router/test1">
                        <Link to="/router/test1" >Calendar</Link>
                    </Menu.Item>
                    <Menu.Item key="/router/test2">
                        <Link to="/router/test2" >test2</Link>
                    </Menu.Item>
                    <Menu.Item key="3">选项3</Menu.Item>
                    <Menu.Item key="4">选项4</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>导航二</span></span>}>
                    <Menu.Item key="5">选项5</Menu.Item>
                    <Menu.Item key="6">选项6</Menu.Item>
                    <SubMenu key="sub3" title="三级导航">
                        <Menu.Item key="7">选项7</Menu.Item>
                        <Menu.Item key="8">选项8</Menu.Item>
                    </SubMenu>
                </SubMenu>
                <SubMenu key="sub4" title={<span><Icon type="setting" /><span>导航三</span></span>}>
                    <Menu.Item key="9">选项9</Menu.Item>
                    <Menu.Item key="10">选项10</Menu.Item>
                    <Menu.Item key="11">选项11</Menu.Item>
                    <Menu.Item key="12">选项12</Menu.Item>
                </SubMenu>
            </Menu>
        );
    }
});

const HomePage = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    render() {
        //console.log(this.props)
        //console.log(this.context.router.isActive('/router/test1'))
        return (
            <div>
                <div className="Sidebar">
                    <Sider style={{ float: 'left' }} location={this.props.location}/>
                </div>
                <div className="Content">
                    <ReactCSSTransitionGroup
                        component="div"
                        transitionName="example"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={500}
                        >
                        {React.cloneElement(this.props.children||(<div className='component'>个人1首页</div>), {
                            key: this.props.location.pathname
                        }) }
                    </ReactCSSTransitionGroup>
                </div>
            </div>
        )
    }
})

module.exports = HomePage
