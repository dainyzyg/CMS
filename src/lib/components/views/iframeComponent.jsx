import React from 'react'
import './../../../css/fmLayout.css'

class Iframecomponent extends React.Component {
    render() {
        var url = this.props.location.query.url;
        console.log(this.props);
        return (
            <div className='ant-layout-content'>
                <iframe src={url} className='ant-layout-iframe'></iframe>
            </div>
        )
    }
}

module.exports = Iframecomponent;