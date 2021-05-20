import React, {useState} from "react";
import {
    Button, Col, Form, Image, Input, Row, Select, Typography, DatePicker, notification, message
} from "antd";
import {
    LockOutlined,
    UserOutlined,
    MailOutlined
} from "@ant-design/icons";
import Checkbox from "antd/es/checkbox/Checkbox";
import {CityData, StateData} from "../consts/StateData";
import rockyValleyLogo from "../assets/rocky_valley.svg";
import {useHandleRegisterCustomer} from "../hooks/UserHooks";
import {useForm} from "antd/es/form/Form";
import {useHistory} from "react-router-dom";

const {Link, Title} = Typography;
const {Option} = Select;

const RegisterPage = () => {
    const [cities, setCities] = useState(CityData[StateData[0]]);
    const [selectedState, setSelectedState] = useState(StateData[0]);
    const [selectedCity, setSelectedCity] = useState(CityData[StateData[0]]);

    const [handleRegisterCustomer, {handling}] = useHandleRegisterCustomer();

    const [form] = useForm();
    const history = useHistory();

    const onStateChange = value => {
        setCities(CityData[value]);
        setSelectedState(value);
        setSelectedCity(CityData[value][0])
    };

    const onCityChange = value => {
        setSelectedCity(value);
    };

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{
                width: 70,
            }}>
                <Option value="61">+61</Option>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        </Form.Item>
    );

    const onFinish = values => {
        values.birthday = values.birthday.format("YYYY-MM-DD");
        handleRegisterCustomer(values, () => {
            notification.success({message: "Create a new account successfully!"});
            history.push("/");
            form.resetFields();
        }, async (errorMessage) => {
            message.error(errorMessage);
        });
    };

    return (
        <>
            <Row justify="center" align="middle" style={{minHeight: "100vh"}}>
                <Col>
                    <Row justify="center">
                        <Image src={rockyValleyLogo} preview={false} width={"400px"}/>
                    </Row>
                    <Row justify="center">
                        <Title level={3}>Register</Title>
                    </Row>
                    <Row justify="center">
                        <Form form={form}
                              style={{width: "600px"}}
                              initialValues={{
                                  prefix: "61",
                              }}
                              onFinish={onFinish}>
                            <Form.Item name="username"
                                       rules={[
                                           {
                                               required: true,
                                               message: "Please input your Username!",
                                           }
                                       ]}>
                                <Input prefix={<UserOutlined className="site-form-item-icon"/>}
                                       placeholder="Enter username"
                                       className="name"
                                />
                            </Form.Item>
                            <Form.Item name="email"
                                       rules={[
                                           {
                                               required: true,
                                               message: "Please input your e-mail!"
                                           },
                                           {
                                               type: "email",
                                               message: "Please input a valid email!"
                                           }
                                       ]}>
                                <Input prefix={<MailOutlined className="site-form-item-icon"/>}
                                       placeholder="Your email address"
                                       className="email"/>
                            </Form.Item>
                            <Row justify="space-between" gutter={16}>
                                <Col span={12}>
                                    <Form.Item name={"first_name"}
                                               rules={[
                                                   {
                                                       required: true,
                                                       message: "Please input your first name!",
                                                   }
                                               ]}
                                               style={{
                                                   width: "100%",
                                               }}>
                                        <Input placeholder="Enter your first name"
                                               style={{
                                                   width: "100%",
                                               }}/>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name={"last_name"}
                                               rules={[
                                                   {
                                                       required: true,
                                                       message: "Please input your last name!",
                                                   }
                                               ]}
                                               style={{
                                                   width: "100%",
                                               }}>
                                        <Input placeholder="Enter your last name"
                                               style={{
                                                   width: "100%",
                                               }}/>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item name="phone"
                                       rules={[
                                           {
                                               required: true,
                                               message: "Please input your phone number!",
                                           }
                                       ]}>
                                <Input addonBefore={prefixSelector}
                                       className="Phone"
                                       placeholder="Enter your phone number"
                                       style={{
                                           width: "100%",
                                       }}/>
                            </Form.Item>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item name="birthday"
                                               rules={[
                                                   {
                                                       required: true,
                                                       message: "Please select your birthday!",
                                                   }
                                               ]}>
                                        <DatePicker style={{
                                            width: "100%",
                                        }}/>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="gender"
                                               rules={[
                                                   {
                                                       required: true,
                                                       message: "Please select your birthday!",
                                                   }
                                               ]}>
                                        <Select placeholder="Select your gender">
                                            <Option value="male">Male</Option>
                                            <Option value="female">Female</Option>
                                            <Option value="others">Others</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item name="address_line">
                                <Input.Group compact>
                                    <Form.Item name="address_line"
                                               noStyle
                                               rules={[
                                                   {
                                                       required: true,
                                                       message: "Address line is required!"
                                                   }
                                               ]}>
                                        <Input placeholder="Input address line"/>
                                    </Form.Item>
                                </Input.Group>
                            </Form.Item>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item name="state">
                                        <Select value={selectedState} onChange={onStateChange}>
                                            {StateData.map(state => (
                                                <Option key={state} value={state}>{state}</Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="city">
                                        <Select value={selectedCity} onChange={onCityChange}>
                                            {cities.map(city => (
                                                <Option key={city} value={city}>{city}</Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item name="postcode"
                                       rules={[
                                           {
                                               required: true,
                                               message: "Postcode is required"
                                           }
                                       ]}>
                                <Input placeholder="Input postcode" className="postcode"/>
                            </Form.Item>
                            <Form.Item name="password"
                                       rules={[
                                           {required: true, message: "Please input your password!"},
                                           {
                                               pattern: /\d/,
                                               message: "Must have at least one number!"
                                           },
                                           {
                                               pattern: /.*[A-Z].*/,
                                               message: "Must have at least one capital letter!"
                                           },
                                           () => ({
                                               validator(_, value) {
                                                   if (!value || value.length > 7) {
                                                       return Promise.resolve();
                                                   }
                                                   return Promise.reject(new Error("Must have at least 8 characters!"));
                                               },
                                           })
                                       ]}
                                       hasFeedback>
                                <Input.Password prefix={<LockOutlined className="site-form-item-icon"/>}
                                                placeholder="Create password"/>
                            </Form.Item>
                            <Form.Item name="confirm_password"
                                       dependencies={["password"]}
                                       hasFeedback
                                       rules={[
                                           {
                                               required: true,
                                               message: "Please confirm your password!",
                                           },
                                           ({getFieldValue}) => ({
                                               validator(_, value) {
                                                   if (!value || getFieldValue("password") === value) {
                                                       return Promise.resolve();
                                                   }
                                                   return Promise.reject(new Error("The two passwords that you entered do not match!"));
                                               },
                                           }),
                                       ]}>
                                <Input.Password prefix={<LockOutlined className="site-form-item-icon"/>}
                                                placeholder="Confirm password"/>
                            </Form.Item>
                            <Form.Item name="agreement"
                                       className="agree"
                                       valuePropName="checked"
                                       rules={[
                                           {
                                               validator: (_, value) =>
                                                   value ? Promise.resolve() : Promise.reject(new Error("Should accept agreement")),
                                           }
                                       ]}>
                                <Checkbox>
                                    I agree to <a href="">the term and conditions</a>
                                </Checkbox>
                            </Form.Item>
                            <Form.Item className="create-btn">
                                <Button type="primary"
                                        htmlType="submit"
                                        loading={handling}>
                                    Create
                                </Button>
                            </Form.Item>
                            <Form.Item className="redirect">
                                Already have an account? &nbsp;
                                <Link href="/login">
                                    Sign in
                                </Link>
                            </Form.Item>

                        </Form>
                    </Row>
                </Col>
            </Row>
        </>
    );
};

export default RegisterPage;
