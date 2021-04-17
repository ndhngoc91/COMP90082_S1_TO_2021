import React from "react";
import {
    Form, Button, Divider, Row, Col, Input,
    Collapse
} from "antd";
import {
    CheckCircleTwoTone
} from "@ant-design/icons";
import _ from 'underscore';
import AdditionalCustomerSection from './AdditionalCustomerSection'

const user = {
    'Title': 'Mr.',
    'First Name': 'Mingda',
    'Last Name': 'Dong',
    'Date of Birth': '1995-12-02',
    'Phone Number': '0481233205',
    'Email': 'mingda.clairvoyantegg.dong@gmail.com',
    'Height': '180',
    'Weight': '60'
}

const gutterInfo = { xs: 8, sm: 16, md: 24, lg: 32 }

const { Panel } = Collapse;
const HiringForm = () => {  
    const customers = [];

    const _handleSubmit = () => {
        console.log("submitting the form..");
    };

    const basicInfoHtml = userData => {
        let cols = [];
        Object.entries(userData).forEach(([key, value], index) => {
            cols.push(
                <Col key={index} className="gutter-row" span={6}>
                    <Form.Item style={{fontSize: "16px"}}>
                        {key}
                        <Input
                            name={`${key}`}
                            id={`${key}`}
                            size={`${key}`}
                            disabled
                            value={value}
                        />
                    </Form.Item>
                </Col>
            )
        });
        return cols;
    };

    const onAddCustomer = customerData => {
        customers.push(customerData);
    };

    const onRemoveCustomer = customerData => {
        // customers.splice()
    }

    //Form UI Design
    return (
        <Form style={{width: "100%"}}
              className="hiring-form"
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

                <Collapse bordered={false} defaultActiveKey={['1', '2', '3']}>
                    <Panel header="Basic Information" key="1">
                        {
                            /**
                            * display the information of customer
                            * who initiates this hiring contract
                            */
                        }
                        <Row gutter={gutterInfo} justify="space-around">
                            {
                                basicInfoHtml(user)
                            }
                        </Row>
                    </Panel>
                        
                    <Panel header="Additional Customers" key="2">
                        <AdditionalCustomerSection
                            onAdd={onAddCustomer}
                            onRemove={onRemoveCustomer}
                        />
                        {

                        }
                    </Panel>

                    <Panel header="Equipment Hiring Basket" key="3">
                        {
                            /**
                            * add equipment section
                            */
                        }
                    </Panel>
                </Collapse>
            </div>

            <Form.Item style={{fontSize: "16px", textAlign: "center", alignItems: "center"}}>
                <Button
                    type="primary"
                    icon={<CheckCircleTwoTone/>}
                    size="large"
                    htmlType="submit"
                    className="signup-form-button"
                >
                    Create
                </Button>
            </Form.Item>

            <Form.Item style={{marginBottom: "0px", fontSize: "8px", textAlign: "center"}}>Copyright ©COMP90082
                Squizz </Form.Item>
        </Form>
    )
};

export default HiringForm