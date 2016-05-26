import ReactDOM from 'react-dom';
import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const FrontpageMenuComponent = React.createClass({
    getInitialState() {
        return {
            current: '',
            openKeys: ['56f34cd538e2124a0c85c28b']
        };
    },
    handleClick(e) {
        console.log('click ', e);
        this.setState({
            current: e.key
        });
    },
    onToggle(info) {
        this.setState({
            openKeys: info.open ? info.keyPath : info.keyPath.slice(1)
        });
    },
    onSelect(item, key, selectedKeys) {
    },
    render() {
        var treeData = this.props.data;
        console.log('treeData', treeData);
        function loop(path) {
            var treeNodesArray = [];
            var tree = treeData.filter(function (item) {
                return item.path == path
            });
            console.log('tree', tree);
            tree.forEach(function (item) {
                var treeNodes = loop(path + item.menuName + '/');
                console.log('item.functionURL',item);
                if (treeNodes.length > 0) {
                    treeNodesArray.push(<SubMenu title={<span><Icon type="appstore" />{item.menuName}</span>}
                                                 key={item._id}>{treeNodes}</SubMenu>)
                }
                else {
                    treeNodesArray.push(<Menu.Item key={item._id}><Link to={item.functionURL}><Icon type="laptop"/>{item.menuName}</Link></Menu.Item>);
                }
            });
            return treeNodesArray
        }

        const treeNodes = loop('菜单/');
        return (
            <Menu mode="inline"
                  onClick={this.handleClick}
                  openKeys={this.state.openKeys}
                  selectedKeys={[this.state.current]}
                  onOpen={this.onToggle}
                  onClose={this.onToggle}
                  onSelect={this.onSelect}>
                {treeNodes}
            </Menu>
        );
    }
});

export default FrontpageMenuComponent;