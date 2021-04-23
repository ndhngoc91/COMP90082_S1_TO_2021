import React, {useState, useEffect, useRef} from "react";
import {
    Form, Button, Row, Col, Input, Collapse, List, Typography
} from "antd";
import {
    CheckCircleTwoTone,
    MinusCircleOutlined,
    PlusOutlined,
    UpOutlined
} from "@ant-design/icons";
import AdditionalCustomerSection from './AdditionalCustomerSection';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

const user = {
    'Title': 'Mr.',
    'First Name': 'Tom',
    'Last Name': 'Smith',
    'Date of Birth': '1900-01-01',
    'Phone Number': '012345678',
    'Email': 'abc@def.com',
    'Height': '183',
    'Weight': '60'
}

const allUsers = [
    {
        'title': 'Mr.',
        'firstName': 'Thomas',
        'lastName': 'Smith',
        'dob': '1900-01-01',
        'phoneNumber': '012345678',
        'email': 'abc@def.com',
        'height': '183',
        'weight': '60'
    },
    {
        'Title': 'Mr.',
        'firstName': 'Tom',
        'lastName': 'Smith',
        'dob': '1900-01-01',
        'phoneNumber': '012345678',
        'email': 'abc@def.com',
        'height': '183',
        'weight': '60'
    },
    {
        'title': 'Mr.',
        'firstName': 'Abc',
        'lastName': 'Smith',
        'dob': '1900-01-01',
        'phoneNumber': '012345678',
        'email': 'abc@def.com',
        'height': '183',
        'weight': '60'
    }
]

const gutterInfo = { xs: 8, sm: 16, md: 24, lg: 32 }

const { Search } = Input;
const { Panel } = Collapse;
const HiringForm = () => {  
    const [customers, setCustomerList] = useState("");

    const _handleSubmit = (values) => {
        console.log(values);
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

    const removeCustomer = index => {
        customers.splice(index, 1);
        console.log(customers);
        setCustomerList(customers => customers);
        return customers;
    };

    //Form UI Design
    return (
        <Form.Provider
            onFormFinish={(name, { values, forms }) => {
            if (name === 'userForm') {
                const { basicForm } = forms;
                const users = basicForm.getFieldValue('users') || [];
                basicForm.setFieldsValue({
                    users: [...users, values],
                });
                setVisible(false);
            }
            }}
        >
            <Form style={{width: "100%"}}
                className="hiring-form"
                name="basicForm"
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

                    <Collapse bordered={false} defaultActiveKey={['1', '2', '3', '4']}>
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
                                customers={customers}
                                onAdd={setCustomerList}
                                onRemove={setCustomerList}
                                allUsers={allUsers}
                            />
                            <List
                                header={<div>Accompanying Customers</div>}
                                bordered
                                itemLayout="horizontal"
                                dataSource={customers}
                                renderItem={(item, index) => (
                                    <List.Item
                                        actions={[<Button size="small" onClick={_ => setCustomerList(customers => customers.filter((c, i) => i != index))}>Delete</Button>]}>
                                        <Typography.Text mark>[ITEM]</Typography.Text>{item.firstName}
                                    </List.Item>
                                )}
                            ></List>
                        </Panel>

                        <Panel header="Equipment Hiring Basket" key="3">
                            {
                                /**
                                * add equipment section
                                */
                            }
                        </Panel>

                        <Panel header="Hiring duration" key="4">
                            {
                                /**
                                * add hiring time
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
                        Proceed to next step
                    </Button>
                </Form.Item>

                <Form.Item style={{marginBottom: "0px", fontSize: "8px", textAlign: "center"}}>Copyright ©COMP90082
                    Squizz </Form.Item>
            </Form>
        </Form.Provider>
    )
};

export default HiringForm