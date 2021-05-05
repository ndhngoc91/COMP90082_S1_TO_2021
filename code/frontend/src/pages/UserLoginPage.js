import React from 'react';
import rockyValleyLogo from "../assets/rocky_valley.svg";

import '../assets/css/userLogin.css'
import {Button, Form, Input, Row, Col, Image, Typography} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import Checkbox from "antd/es/checkbox/Checkbox";

const {Title, Text, Link} = Typography;

const UserLoginPage = () => {
    const onFinish = values => {
        //TODO: handle login here
        console.log(values);
    };

    return (
        <>
            <Row justify="center" align="middle" style={{minHeight: "100vh"}}>
                <Col>
                    <Row justify="center">
                        <Image src={rockyValleyLogo} preview={false} width={"400px"}/>
                    </Row>
                    <Row justify="center">
                        <Title level={3}>Sign In</Title>
                    </Row>
                    <Row justify="center">
                        <Form name="normal_login"
                              initialValues={{remember: true}}
                              onFinish={onFinish}>
                            <Form.Item name="username"
                                       rules={[{required: true, message: "Please input your Username!"}]}>
                                <Input prefix={<UserOutlined className="prefix-icon"/>}
                                       placeholder="Username"/>
                            </Form.Item>
                            <Form.Item name="password"
                                       rules={[{required: true, message: "Please input your Password!"}]}>
                                <Input prefix={<LockOutlined className="prefix-icon"/>}
                                       type="password"
                                       placeholder="Password"/>

                            </Form.Item>
                            <Form.Item>
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox>Remember me</Checkbox>
                                </Form.Item>
                            </Form.Item>
                            <Form.Item>
                                <Form.Item name="signInAsStaff" noStyle>
                                    <Checkbox>Sign in as staff</Checkbox>
                                </Form.Item>
                            </Form.Item>

                            <Form.Item>
                                <Button type="default" htmlType="submit">
                                    Sign In
                                </Button>
                            </Form.Item>
                            <Form.Item>
                                <Col>
                                    <Row justify="center">
                                        <Link href="/reset-password">
                                            Forgot your password?
                                        </Link>
                                    </Row>
                                    <Row justify="center">
                                        <Text>
                                            <Text>Don't have an account? </Text>
                                            <Link href="/user-create" target="_blank">
                                                Create one now
                                            </Link>
                                        </Text>
                                    </Row>
                                </Col>
                            </Form.Item>
                        </Form>
                    </Row>
                </Col>
            </Row>
        </>
    );
}

export default UserLoginPage;
