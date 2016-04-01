import React from 'react'
import './../../../css/fmLayout.css'

class Test4 extends React.Component {
    render() {
        var location=this.props.location
        console.log(location)
        var href= '../dragform/dragform.html?id=' + location.query.id
        return (
            <div className='ant-layout-content'>
                <iframe src={href} className='ant-layout-iframe'></iframe>
            </div>
        )
    }
}

module.exports = Test4