/**
 * Created by Baggio on 2016/5/17.
 * 组织机构管理页面面包屑导航
 */
import ReactDOM from 'react-dom';
import React from 'react';
import {Breadcrumb} from 'antd';
var OUBreadcrumbComponent = React.createClass({
    getInitialState() {
        //console.log(this.props.data)
        return { data: false }
    },

    handleClick(path){
        var data=this.formatData(path)
        this.setState({ data: data })
        this.props.handleClick(path)

    },
    formatData(path){
        var data=path.split('/')
        var BreadcrumbList=[]
        for (var i in data){
            var path2=''
            for(var a=0;a<=i;a++){
                path2=path2+data[a]+'/'

            }
            BreadcrumbList.push(<Breadcrumb.Item href="javascript:void(0)" key={data[i]}
                                                 onClick={this.handleClick.bind(this,path2)}> {data[i]} </Breadcrumb.Item>)

        }
        return BreadcrumbList
    },
    render() {
        var BreadcrumbList

        BreadcrumbList=this.formatData(this.props.path)


        return (

            <Breadcrumb separator=">">
                {BreadcrumbList}
            </Breadcrumb>
        )
    }
})

export default OUBreadcrumbComponent;
