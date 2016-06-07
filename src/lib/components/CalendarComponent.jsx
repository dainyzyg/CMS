import ReactDOM from 'react-dom';
import React from 'react';
import { Button, Table, Icon, Col, Row, Input,Pagination,Calendar  } from 'antd';
import classNames from 'classnames';
import reqwest from 'reqwest';


function onPanelChange(value, mode) {
    console.log(value, mode);
}
var CalendarComponent = React.createClass({
    render() {
        return (
            <div style={{ width: 290, border: '1px solid #d9d9d9', borderRadius: 4 }}>
                <Calendar onPanelChange={onPanelChange}
                          fullscreen={false}/>
            </div>
        );
    }
});
export default CalendarComponent;