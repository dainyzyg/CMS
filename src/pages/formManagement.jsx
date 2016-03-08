import ReactDOM from 'react-dom';
import React from 'react';
import { Row, Col } from 'antd';

ReactDOM.render(
    <div>
        <Row>
            <Col span="8">.test123</Col>
            <Col span="8">.col-8</Col>
            <Col span="8">.col-8</Col>
        </Row>
        <Row className="testRowClassName">
            <Col span="8">.col-8</Col>
            <Col span="8">.col-8</Col>
            <Col span="8" className="testColClassName">.col-8</Col>
        </Row>
        <Row>
            <Col span="6">.col-6</Col>
            <Col span="6">.col-6</Col>
            <Col span="6">.col-6</Col>
            <Col span="6">.col-6</Col>
        </Row>
    </div>,
    document.getElementById('react-content')
);