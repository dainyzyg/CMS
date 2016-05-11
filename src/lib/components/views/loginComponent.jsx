import ReactDOM from 'react-dom';
import React from 'react';
import './../css/loginLayout.css';
import reqwest from 'reqwest';
import {Input, Button, Alert} from 'antd'

const LoginComponent = React.createClass({
    getInitialState(){
        return {
            userName: '',
            passWord: '',
            alertDisplay: 'none',
            alertMessage: ''
        }
    },
    handleUser(event)
    {
        var value = event.target.value;
        this.setState({
            userName: value
        })
    },
    handlePwd(event)
    {
        var value = event.target.value;
        this.setState({
            passWord: value
        })
    },
    onSubmit()
    {
        if (this.state.userName == '') {
            this.setState({
                alertDisplay: 'inline',
                alertMessage: '请输入用户名'
            })
        }
        //else if (this.state.userName.indexOf('ptr\\') == -1 || this.state.userName.indexOf('cnpc\\') == -1) {
        //    this.setState({
        //        alertDisplay: 'inline',
        //        alertMessage: '请以ptr\或cnpc\起始填写用户名'
        //    })
        //}
        else if (this.state.passWord == '') {
            this.setState({
                alertDisplay: 'inline',
                alertMessage: '请输入密码'
            })
        }
        else {
            reqwest({
                url: '../api/loginManagement',
                method: 'post',
                data: {
                    action: 'verify',
                    userName: this.state.userName,
                    passWord: this.state.passWord
                },
                type: 'json',
                success: (result) => {
                    console.log('result', result);
                    if (result.result.retval == "success") {
                        window.location.href="http://www.baidu.com";
                    }
                    else if (result.result.retval == "notFind") {
                        this.setState({
                            alertDisplay: 'inline',
                            alertMessage: '用户名不存在'
                        })
                    }
                    else if (result.result.retval == "notMatch") {
                        this.setState({
                            alertDisplay: 'inline',
                            alertMessage: '用户名密码不匹配'
                        })
                    }
                }
            })
        }
    },
    render()
    {
        return (
            <div className="login">
                <div className="header">
                    <div className="logo-image"></div>
                    <div className="logo-text">信息化工作平台</div>
                </div>
                <div style={{display:this.state.alertDisplay}}>
                    <Alert message={this.state.alertMessage} type="warn" showIcon/>
                </div>
                <Input onChange={this.handleUser} value={this.state.userName} size="large"
                       placeholder="请输入cnpc或ptr账户名"
                       style={{height:'40px'}}></Input>
                <Input onChange={this.handlePwd} value={this.state.passWord} size="large" type="password"
                       placeholder="请输入密码" style={{height:'40px'}}></Input>
                <Button size="large" type="primary" onClick={this.onSubmit} style={{height:'40px'}}>登录</Button>
            </div>
        );
    }
});

export default LoginComponent;
//ReactDOM.render(<LoginComponent />, document.getElementById('react-content'));