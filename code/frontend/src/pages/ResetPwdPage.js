{/*ResetPwdPage*/}
import React, {Fragment, useEffect, useState} from 'react';
import {Button, Form, Input} from "antd";
import '../assets/css/forgetPwd.css'
import {useHistory} from "react-router-dom";

const ResetPwdPage = () => {

    const history = useHistory();
    const [password, setPassword] = useState();

    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    const handleClick = (event) => {
        history.push("/user-login")
    }

    useEffect(() => {

    },[password])

    return (
        <div className="reset">
            <h1>Forget Your Password?</h1>
            <section className="reset-content">
                <Form
                    form={form}
                    name="reset-form"
                    onFinish={onFinish}
                >

                    <h2>Reset Your Password</h2>
                    <Form.Item
                        name="password"
                        className="pwd"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password className="pwd-input"/>
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        className="confirm-pwd"
                        label="Confirm Password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password className="confirm-pwd-input"/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary"
                                htmlType="submit"
                                className="reset-form-button"
                                onClick={handleClick}
                        >
                            Reset
                        </Button>
                    </Form.Item>
                </Form>
            </section>
        </div>
    );
}

export default ResetPwdPage;