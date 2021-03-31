//ant design
import {Typography, Form, Input, Button, Row, Col, Divider, Select} from "antd";
import {message as antdMessage} from "antd" ;
import {
    CheckCircleTwoTone,
    GlobalOutlined,
    UserAddOutlined,
    UserOutlined,
    EnvironmentOutlined,
    PhoneOutlined,
    MailOutlined,
} from "@ant-design/icons";
//React
import React, {useEffect, useState} from "react";
import Axios from "axios";
import {Redirect} from "react-router-dom";

const {Option} = Select;

const CreateForm = () => {
    const [customerCodeList, setCustomerCodeList] = useState("");

    // Customer Information
    const [customerCode, setCustomerCode] = useState("");
    const [title, setTitle] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [nationalitycode, setNationalitycode] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [details, setDetails] = useState("");

    // Address Information
    const [deliveryAddressLine1, setDeliveryAddressLine1] = useState("");
    const [deliveryAddressLine2, setDeliveryAddressLine2] = useState("");
    const [deliveryRegionName, setDeliveryRegionName] = useState("");
    const [deliveryCountryName, setDeliveryCountryName] = useState("");
    const [deliveryPostcode, setDeliveryPostcode] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [createSuccess, setCreateSuccess] = useState("");

    // Read customers code list from API
    useEffect(() => {
        Axios({
                method: "get",
                url: "api/customer_codes",
                headers: {"Content-Type": "application/JSON; charset=UTF-8"},
                params: {"used": 0}
            }
        ).then((response) => {
            setCustomerCodeList(response.data);
        })
    }, []);

    //Handles submission about creating a new customer
    const _handleSubmit = () => {
        Axios({
            method: "post",
            url: "api/customers",
            headers: {"Content-Type": "application/JSON; charset=UTF-8"},
            data: {
                "customer": {
                    "customer_code": customerCode,
                    "title": title,
                    "organization_desc": details,
                    "first_name": firstName,
                    "last_name": lastName,
                    "phone": phone,
                    "email": email,
                    "nationality_code": nationalitycode
                },
                "address": {
                    "contact": phone,
                    "address_line1": deliveryAddressLine1,
                    "address_line2": deliveryAddressLine2,
                    "postcode": deliveryPostcode,
                    "region": deliveryRegionName,
                    "country": deliveryCountryName
                }
            }
        }).then((response) => {
            console.log("Create Customer Success!");
            console.log(response);
            let {customer} = response.data;
            console.log("Create Customer ID:" + customer.id);
            setCreateSuccess(true);
        }).catch((e) => {
            console.log(e)
            setErrorMessage(e.response.data.message);
            antdMessage.info(errorMessage);
        });
    }

    const {Title} = Typography;
    const {TextArea} = Input;

    // Redirect to switch customer page if create success
    if (createSuccess) {
        return <Redirect to={{pathname: "/choose"}}/>
    }

    // Read avaliable customer code information into the drop down list
    const children = [];
    for (let i = 0; i < customerCodeList.length; i++) {
        children.push(<Option key={customerCodeList[i]}>{customerCodeList[i]}</Option>);
    }

    //Form UI Design
    return (
        <Form style={{width: "100%"}}
              className="register-form"
              initialValues={{remember: true}}
              onFinish={_handleSubmit}
        >
            <Form.Item style={{marginTop: "20px", fontSize: "14px", textAlign: "right", alignItems: "center"}}>
                Go back to
                <Button type="link" href="\choose">Choose Customer</Button>
            </Form.Item>

            <div style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
                <div className="logo" style={{fontSize: "50px"}}>
                    <UserAddOutlined style={{color: "#0099ff"}}/>
                </div>

                <Title level={2} style={{marginBottom: "20px"}}>Create Customer Account</Title>
            </div>

            <div style={{marginLeft: "30px", alignItems: "center", width: "95%"}}>
                <Row gutter={[10, 24]} justify="space-around">
                    <Divider orientation="left">Identity</Divider>
                    <Col span={5}>
                        <Form.Item style={{fontSize: "16px"}}>
                            Customer Code
                            <Select name="customerCode"
                                    id="customerCode"
                                    autoComplete="customerCode"
                                    size="large"
                                    variant="outlined"
                                    required
                                    autoFocus
                                    placeholder="Choose a code:"
                                    onChange={(value) => {
                                        setCustomerCode(value);
                                    }}>
                                {children}
                            </Select>
                        </Form.Item>
                    </Col>

                    <Divider orientation="left">Basic Information</Divider>
                    <Col span={5}>
                        <Form.Item style={{fontSize: "16px"}}>
                            Title
                            <Select name="title"
                                    id="title"
                                    autoComplete="title"
                                    size="large"
                                    variant="outlined"
                                    required
                                    autoFocus
                                    onChange={(value) => {
                                        setTitle(value);
                                    }}>
                                <Option value="Mr.">Mr.</Option>
                                <Option value="Mrs.">Mrs.</Option>
                                <Option value="Ms.">Ms.</Option>
                                <Option value="Miss">Miss</Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={5}>
                        <Form.Item style={{fontSize: "16px"}}
                                   rules={[{required: true, message: "Please input your first name!"}]}>
                            First Name
                            <Input
                                name="firstName"
                                id="firstName"
                                autoComplete="firstName"
                                size="large"
                                variant="outlined"
                                required
                                autoFocus
                                prefix={<UserOutlined className="site-form-item-icon"/>}
                                value={firstName}
                                onChange={(e) => {
                                    setFirstName(e.target.value);
                                }}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={5}>
                        <Form.Item style={{fontSize: "16px"}}>
                            Last Name
                            <Input
                                size="large"
                                variant="outlined"
                                required
                                id="lastName"
                                name="lastName"
                                autoComplete="lastName"
                                prefix={<UserOutlined className="site-form-item-icon"/>}
                                value={lastName}
                                onChange={(e) => {
                                    setLastName(e.target.value);
                                }}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={5}>
                        <Form.Item style={{fontSize: "16px"}}>
                            Nationality Code
                            <Select name="nationalitycode"
                                    id="nationalitycode"
                                    autoComplete="nationalitycode"
                                    size="large"
                                    variant="outlined"
                                    required
                                    autoFocus
                                    placeholder="Choose your nationality:"
                                    onChange={(value) => {
                                        setNationalitycode(value);
                                    }}>
                                <Option value="AU">AU</Option>
                                <Option value="CA">CA</Option>
                                <Option value="CN">CN</Option>
                                <Option value="ES">ES</Option>
                                <Option value="FR">FR</Option>
                                <Option value="GB">GB</Option>
                            </Select>
                        </Form.Item>
                    </Col>


                    <Col span={11}>
                        <Form.Item style={{fontSize: "16px"}}>
                            Phone Number
                            <Input
                                size="large"
                                variant="outlined"
                                required
                                id="phone"
                                name="phone"
                                autoComplete="phone"
                                placeholder="XXXXXXXX"
                                prefix={<PhoneOutlined className="site-form-item-icon"/>}
                                value={phone}
                                onChange={(e) => {
                                    setPhone(e.target.value);
                                }}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={11}>
                        <Form.Item style={{fontSize: "16px"}}>
                            Email Address
                            <Input
                                size="large"
                                variant="outlined"
                                required
                                id="email"
                                name="email"
                                autoComplete="email"
                                placeholder="XXXXXXXX@XXXX.com"
                                type="email"
                                prefix={<MailOutlined className="site-form-item-icon"/>}
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}/>
                        </Form.Item>
                    </Col>

                    <Divider orientation="left">Billing Addresses</Divider>

                    <Col span={5}/>
                    <Col span={11}>
                        <Form.Item style={{fontSize: "16px"}}>
                            Address Line 1
                            <Input size="large"
                                   variant="outlined"
                                   required
                                   id="deliveryAddressLine1"
                                   name="deliveryAddressLine1"
                                   autoComplete="deliveryAddressLine1"
                                   placeholder="Street address, P.O.box, company name, c/o"
                                   prefix={<EnvironmentOutlined className="site-form-item-icon"/>}
                                   value={deliveryAddressLine1}
                                   onChange={(e) => {
                                       setDeliveryAddressLine1(e.target.value);
                                   }}/>
                        </Form.Item>
                    </Col>
                    <Col span={5}/>

                    <Col span={5}/>
                    <Col span={11}>
                        <Form.Item style={{fontSize: "16px"}}>
                            Address Line 2
                            <Input size="large"
                                   variant="outlined"
                                   required
                                   id="deliveryAddressLine2"
                                   name="deliveryAddressLine2"
                                   autoComplete="deliveryAddressLine2"
                                   placeholder="Apartment, suite, unit, building, floor, etc."
                                   prefix={<EnvironmentOutlined className="site-form-item-icon"/>}
                                   value={deliveryAddressLine2}
                                   onChange={(e) => {
                                       setDeliveryAddressLine2(e.target.value);
                                   }}/>
                        </Form.Item>
                    </Col>
                    <Col span={5}/>

                    <Col span={5}/>
                    <Col span={11}>
                        <Form.Item style={{fontSize: "16px"}}
                                   value={deliveryRegionName}
                                   onChange={(e) => {
                                       setDeliveryRegionName(e.target.value);
                                   }}>
                            State/Province/Region
                            <Input size="large"
                                   variant="outlined"
                                   required
                                   id="deliveryRegionName"
                                   name="deliveryRegionName"
                                   autoComplete="deliveryRegionName"
                                   prefix={<EnvironmentOutlined className="site-form-item-icon"/>}/>
                        </Form.Item>
                    </Col>
                    <Col span={5}/>

                    <Col span={5}/>
                    <Col span={11}>
                        <Form.Item style={{fontSize: "16px"}}
                                   value={deliveryCountryName}
                                   onChange={(e) => {
                                       setDeliveryCountryName(e.target.value);
                                   }}>
                            Country
                            <Input
                                size="large"
                                variant="outlined"
                                required
                                id="deliveryCountryName"
                                name="deliveryCountryName"
                                autoComplete="deliveryCountryName"
                                prefix={<GlobalOutlined className="site-form-item-icon"/>}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={5}/>

                    <Col span={5}/>
                    <Col span={11}>
                        <Form.Item style={{fontSize: "16px"}}
                                   value={deliveryPostcode}
                                   onChange={(e) => {
                                       setDeliveryPostcode(e.target.value);
                                   }}>
                            Postcode
                            <Input size="large"
                                   variant="outlined"
                                   required
                                   id="deliveryPostcode"
                                   name="deliveryPostcode"
                                   autoComplete="deliveryPostcode"
                                   prefix={<EnvironmentOutlined className="site-form-item-icon"/>}/>
                        </Form.Item>
                    </Col>
                    <Col span={5}/>

                    <Divider orientation="left">Squizz Organization Details</Divider>
                    <Col span={23}>
                        <Form.Item style={{fontSize: "16px"}}
                                   value={details}
                                   onChange={(e) => {
                                       setDetails(e.target.value);
                                   }}>
                            <TextArea
                                autoSize={{minRows: 4, maxRows: 8}}
                                variant="outlined"
                                id="details"
                                name="details"
                                autoComplete="details"
                            />
                        </Form.Item>
                    </Col>

                </Row>
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

export default CreateForm
