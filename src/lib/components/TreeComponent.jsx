/**
 * Created by Baggio on 2016/4/28.
 */
import ReactDOM from 'react-dom';
import React from 'react';
import { Tree } from 'antd';
const TreeNode = Tree.TreeNode;

const TreeComponent = React.createClass({
    getInitialState() {
        return {
            treeData: [],
        };
    },
    onExpand(treeNode, expand, expandedKeys) {
        //console.log('onExpand', treeNode, expand, expandedKeys);
    },
    onSelect(info) {
        console.log('selected', info);
        this.props.onSelect(info)
    },
    onLoadData(treeNode) {
        //console.log('treeNode', treeNode)
        return new Promise((resolve) => {
            const treeData = [...this.state.treeData];
            this.setState({treeData});
            resolve();
        });
    },

    render() {
        var treeData = this.props.treeData;
        //console.log('treeData11', treeData);
        function loop(path) {
            //console.log('path',path)
            var treeNodesArray = []
            var tree = treeData.filter(function (item) {
                return item.path == path
            })


                tree.forEach(function (item) {
                    var treeNodes=loop(path + item.OUName + '/')
                    if (treeNodes.length > 0) {
                        treeNodesArray.push(<TreeNode title={item.OUName} key={item._id}>{treeNodes}</TreeNode>)
                    }
                    else{
                        treeNodesArray.push(<TreeNode title={item.OUName} key={item._id} isLeaf={true}/>)
                    }


                })

            return treeNodesArray
        }

        const treeNodes = loop('组织机构/');
        return (
            <Tree onSelect={this.onSelect} loadData={this.onLoadData} onExpand={this.onExpand}>
                {treeNodes}
            </Tree>
        );
    }

})

export default TreeComponent;