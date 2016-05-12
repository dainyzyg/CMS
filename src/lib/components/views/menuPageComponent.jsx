/**
 * Created by Baggio on 2016/4/27.菜单测试
 */
import React from 'react'
import ReactDOM from 'react-dom'
import MenuComponent from '../MenuComponent.jsx';
var menuPageComponent = React.createClass({
    getInitialState() {
        return {
            data:[{
            "_id" : "56f34c3838e2124a0c85c28a",
                "menuName" : "菜单",
                "functionURL" : "",
                "description" : "根菜单",
                "createTime" : "2016/3/24",
                "showOrder" : "",
                "path" : null
        },

        /* 2 */
        {
            "_id" : "56f34cd538e2124a0c85c28b",
            "menuName" : "系统管理",
            "functionURL" : "",
            "description" : "配置类菜单",
            "createTime" : "2016/3/24",
            "showOrder" : "1",
            "path" : "菜单/"
        },

        /* 3 */
        {
            "_id" : "56f34dc538e2124a0c85c28d",
            "menuName" : "表单管理",
            "functionURL" : "",
            "description" : "",
            "createTime" : "2016/3/24",
            "showOrder" : "1",
            "path" : "菜单/系统管理/"
        },

        /* 4 */
        {
            "_id" : "56f34dc538e2124a0c85c28e",
            "menuName" : "流程管理",
            "functionURL" : "",
            "description" : "",
            "createTime" : "2016/3/24",
            "showOrder" : "2",
            "path" : "菜单/系统管理/"
        },

        /* 5 */
        {
            "_id" : "56fcc73738e2124a0c85c29a",
            "menuName" : "应用管理",
            "functionURL" : "应用管理url",
            "description" : "应用管理说明",
            "createTime" : "2016/3/31",
            "showOrder" : "2",
            "path" : "菜单/"
        },

        /* 6 */
        {
            "_id" : "56fcc7e338e2124a0c85c29b",
            "menuName" : "用户管理",
            "functionURL" : "用户管理url",
            "description" : "用户管理说明",
            "createTime" : "2016/3/31",
            "showOrder" : "3",
            "path" : "菜单/系统管理/"
        },

        /* 7 */
        {
            "_id" : "56fcca9838e2124a0c85c29c",
            "menuName" : "组织机构管理",
            "functionURL" : "组织机构管理url",
            "description" : "组织机构管理说明",
            "createTime" : "2016/3/31",
            "showOrder" : "4",
            "path" : "菜单/系统管理/"
        },
                {
                    "_id" : "56fe219038e2124a0c85c2ae",
                    "menuName" : "用户配置1",
                    "functionURL" : "用户配置url111",
                    "description" : "用户配置说明1111",
                    "createTime" : "2016/4/5",
                    "showOrder" : "1",
                    "path" : "菜单/应用管理/"
                }]
        }

    }, render() {

        return (
            <div><MenuComponent data={this.state.data}/>
            </div>

        )
    }
})
export default menuPageComponent;