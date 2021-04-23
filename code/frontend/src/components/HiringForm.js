import React, { useState } from "react";
import {
    Form, Button, Row, Col, Input, Divider
} from "antd";
import {
    CheckCircleTwoTone,
    MinusCircleOutlined,
    PlusOutlined,
    UpOutlined
} from "@ant-design/icons";
import AddCustomerModal from './AddCustomerModal'

const user = {
    'title': 'Mr.',
    'firstName': 'Tom',
    'lastName': 'Smith',
    'dateOfBirth': '1900-01-01',
    'phoneNumber': '012345678',
    'email': 'abc@def.com',
    'height': '183',
    'weight': '60'
}

const allUsers = [
    {
        'title': 'Mr.',
        'firstName': 'Thomas',
        'lastName': 'Smith',
        'dateOfBirth': '1900-01-01',
        'phoneNumber': '012345678',
        'email': 'abc@def.com',
        'height': '183',
        'weight': '60'
    },
    {
        'Title': 'Mr.',
        'firstName': 'Tom',
        'lastName': 'Smith',
        'dateOfBirth': '1900-01-01',
        'phoneNumber': '012345678',
        'email': 'abc@def.com',
        'height': '183',
        'weight': '60'
    },
    {
        'title': 'Mr.',
        'firstName': 'Abc',
        'lastName': 'Smith',
        'dateOfBirth': '1900-01-01',
        'phoneNumber': '012345678',
        'email': 'abc@def.com',
        'height': '183',
        'weight': '60'
    }
]

const gutterInfo = { xs: 8, sm: 16, md: 24, lg: 32 }

const keyFormatter = key => {
    const regex = /[A-Z]/g;
    let formattedKey = key.replaceAll(regex, ' $&');
    return formattedKey[0].toUpperCase() + formattedKey.substr(1);
}

const HiringForm = () => {
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const basicInfoHtml = userData => {
        let cols = [];
        Object.entries(userData).forEach(([key, value], index) => {
            const formattedKey = keyFormatter(key);
            cols.push(
                <Col key={index} className="gutter-row" span={6}>
                    <Form.Item
                        initialValue={value}
                        label={`${formattedKey}`}
                        name={`${key}`}
                        style={{fontSize: "16px"}}>
                        <Input />
                    </Form.Item>
                </Col>
            )
        });
        return cols;
    };

    const showAddCustomerModal = _ => setIsModalVisible(true);
    const handleSubmitCustomerModal = _ => setIsModalVisible(false);
    const handleCancelAddCustomer = _ => setIsModalVisible(false);

    const _handleSubmit = values => {
        console.log("submitting the form");
    }

    return (
        <Form style={{width: "100%"}}
            className="hiring-form"
            form={form}
            initialValues={{remember: true}}
            onFinish={_handleSubmit}
        >
            <div style={{marginLeft: "30px", alignItems: "center", width: "95%"}}>
                <Row gutter={gutterInfo} justify="space-around">
                    {
                        /**
                        * user basic information, potentially allow
                        * user to connect to the page after we land on
                        * the page
                        * if logged in, we hide the div and
                        */
                    }
                </Row>
                <Divider>Main Contact Information</Divider>
                <Row gutter={gutterInfo} justify="space-around">
                    {
                        basicInfoHtml(user)
                    }
                </Row>
                <Divider />
                <div className="add-customer-section">
                    <Button
                        type="primary"
                        icon={<CheckCircleTwoTone/>}
                        size="large"
                        className="add-customer-form-button"
                        onClick={showAddCustomerModal}
                    >
                        Add an accompanying customer
                    </Button>
                    <AddCustomerModal 
                        visible={isModalVisible}
                        handleOk={handleSubmitCustomerModal}
                        handleCancel={handleCancelAddCustomer}
                    />
                </div>

                <Form.Item style={{fontSize: "16px", textAlign: "center", alignItems: "center"}}>
                    <Button
                        type="primary"
                        icon={<CheckCircleTwoTone/>}
                        size="large"
                        htmlType="submit"
                        className="signup-form-button"
                    >
                        Proceed to next step
                    </Button>
                </Form.Item>

                <Form.Item style={{marginBottom: "0px", fontSize: "8px", textAlign: "center"}}>Copyright ©COMP90082
                    Squizz </Form.Item>
            </div>
        </Form>
    )
};

export default HiringForm;