import React from 'react'
import './../../../css/fmLayout.css'

class Test3 extends React.Component {
    render() {
        return (
            <div className='ant-layout-content'>
                <iframe src='../dragform/dragform.html' className='ant-layout-iframe'></iframe>
            </div>
        )
    }
}

module.exports = Test3