/**
 * Created by Baggio on 2016/4/28.
 */
import ReactDOM from 'react-dom';
import React from 'react';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


const MenuComponent = React.createClass({
    getInitialState() {
        return {
            current: '1'
        };
    },
    handleClick(e) {
        console.log('click ', e);
        this.setState({
            current: e.key
        });
    },
    render() {
        var treeData = this.props.data
        console.log('treeData',treeData)
        function loop(path) {
            var treeNodesArray = []
            var tree = treeData.filter(function (item) {
                return item.path == path
            })
            console.log('tree',tree)
            tree.forEach(function (item) {
                if(path==null){path=''}
                var treeNodes = loop(path + item.menuName + '/')
                console.log('treeNodes',treeNodes)
                if (treeNodes.length > 0) {
                    treeNodesArray.push(<SubMenu title={item.menuName} key={item._id}>{treeNodes}</SubMenu>)
                }
                else {
                    treeNodesArray.push(<Menu.Item key={item._id}>{item.menuName}</Menu.Item>)
                }
            })

            return treeNodesArray
        }
        const treeNodes = loop(null);

        return (
            <Menu onClick={this.handleClick}
                  style={{ width: 240 }}
                  defaultOpenKeys={['sub1']}
                  selectedKeys={[this.state.current]}
                  mode="inline">
                {treeNodes}
            </Menu>
        );
    }
});


export default MenuComponent;