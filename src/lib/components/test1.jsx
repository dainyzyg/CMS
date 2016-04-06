import React from 'react'
import Formtable from './views/formManagement.jsx'
import './../../css/fmLayout.css'

class Test1 extends React.Component {
    render() {
        return (
            <div className='ant-layout-content'>
                <Formtable className="ant-layout-table"/>
            </div>
        )
    }
}

module.exports = Test1