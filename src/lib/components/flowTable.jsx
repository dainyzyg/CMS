import React from 'react';
import Flowtable from './views/flowManagement.jsx';
import './../../css/fmLayout.css';

class Test2 extends React.Component {
    render() {
        return (
            <div className='ant-layout-content'>
                <Flowtable className="ant-layout-table"/>
            </div>
        )
    }
}

module.exports = Test2