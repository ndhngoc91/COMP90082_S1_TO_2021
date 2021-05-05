import {UserOutlined} from "@ant-design/icons";

{/*ResetPwdPage*/}
import React, {Fragment, useEffect, useState} from 'react';
import {Button, Form, Input} from "antd";
import '../assets/css/forgetPwd.css'
import {useHistory} from "react-router-dom";

const nameData = ["user1","user2"]
const passwordData = {
    user1: "1234sS",
    user2: "1234sS",
}

const ResetPwdPage = () => {

    const history = useHistory();
    const [username, setUsername] = useState(nameData[0]);
    const [password, setPassword] = useState(passwordData[nameData[0]]);

    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        console.log(passwordData[nameData[0]]);
    };

    const handleClick = (event) => {
        console.log({username},{password})
    }

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
                        name="username"
                        label="Username:"
                        className="username"
                        style={{width: "100%"}}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Username!',
                            },
                        ]}
                        value = {username}
                        onChange={(event) => {
                            //check whether the username exists. Need help. it did not work.
                            nameData.map(
                                name => {
                                    if (event.target.value === name){
                                        setUsername(event.target.value);
                                    }else{
                                        alert('username does not exist!');
                                    }
                                }
                            )
                        }}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />}
                               placeholder="Enter username"
                               className="username-input"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        className="pwd"
                        label="Password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        rules={[
                            {
                                pattern: new RegExp(/^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$).{6,10}$/,"g"),
                                message: 'The length is between 6 and 10 characters!' +
                                    'At least one number and uppercase and lowercase letters!',
                            },
                            {
                                required: true,
                                message: 'Please input your password!' ,
                            },
                            {
                                whitespace: true,
                                message: 'No white space!',
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
                                href="/user-login"
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