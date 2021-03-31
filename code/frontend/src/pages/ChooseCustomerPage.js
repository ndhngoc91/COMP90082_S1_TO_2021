import React from "react";
import ChooseCustomer from '../components/ChooseCustomer';
import {Row, Col} from 'antd';
import 'antd/dist/antd.css';

const ChooseCustomerPage = () => {
    return (
        <div style={{backgroundColor: '#F5F5F5'}}>
            <Row style={{height: "100%"}} justify="space-around" align="middle">
                <Col>
                    <ChooseCustomer/>
                </Col>
            </Row>
        </div>
    );
}

export default ChooseCustomerPage;
