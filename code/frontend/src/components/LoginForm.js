import React, {useState} from 'react';
import {Button, Form, Input, Row, Col, Image, Typography} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import Checkbox from "antd/es/checkbox/Checkbox";
import {useHandleLogin} from "../hooks/AuthHooks";
import {useHistory} from "react-router-dom";

const {Title, Text, Link} = Typography;

const LoginForm = () => {
    const history = useHistory();

    const [isLoginModelVisible, setIsLoginModelVisible] = useState(false);

    const onFinish = ({username, password, signInAsStaff}) => {
        handleLogin({username, password, signInAsStaff}, () => {
            history.push("/");
            setIsLoginModelVisible(true);
        });
    };

    const [handleLogin, {handling}] = useHandleLogin();

    return (
        <>
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
                    <Form.Item name="remember" valuePropName="checked">
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                    <Form.Item name="signInAsStaff" valuePropName="checked">
                        <Checkbox>Sign in as staff</Checkbox>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary"
                                htmlType="submit"
                                loading={handling}
                        >
                            Sign In
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Col>
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
        </>
    );
}

export default LoginForm;
