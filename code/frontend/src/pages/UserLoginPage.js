import {useHandleLogin} from "../hooks/AuthHooks";

{/*UserLoginPage*/}
import React, {Fragment, useEffect, useState} from 'react';
import rockyValleyLogo from "../assets/rocky_valley.svg";

import '../assets/css/userLogin.css'
import {Button, Card, Form, Input, Switch} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import Checkbox from "antd/es/checkbox/Checkbox";
import {useHistory} from "react-router-dom";

const Item = Form.Item;

const data = [
    {
        username: "user1",
        password: "squizz",
    },
    {
        username: "user2",
        password: "123",
    }
]


const UserLoginPage = () => {
    const [username, setUsername] = useState({data});
    const [password, setPassword] = useState(["123","123"]);
    const [isStaff, setIsStaff] = useState(false);
    const history = useHistory();

    useEffect(() =>{

    },[username,password])

    const onClick = () => {
        console.log({username},{password});
    }

    const handleIsStaff = (event) => {
        console.log({isStaff});
        if (!isStaff) {
            history.push("/user-create");
        }else{
            history.push("/admin-create");
        }
    }

    return (
        <div className="login">
            <header
                className="login-header"
            >
                <img src={rockyValleyLogo} alt="logo"/>
                <h1 className="title-h1">Rockey Valley System</h1>
            </header>
            <section
                className="login-content"
            >
                <Card bordered={false}
                      style={{width: 400}}
                      className="login-card"
                >
                    <h2 className="title-h2">Sign In</h2>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                    >
                        <Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Username!',
                                },
                            ]}
                            value = {username}
                            onChange={(event) => {
                                setUsername(event.target.value);
                            }}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />}
                                   placeholder="Enter username"
                                   className="name-input"
                            />
                        </Item>
                        <Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Password!',
                                },
                            ]}
                            value = {password}
                            onChange={(event) => {
                                setPassword(event.target.value);
                            }}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                className="password-input"
                                placeholder="Enter password"
                            />
                        </Item>
                        <Item>
                            <Item name="remember"
                                  valuePropName="checked"
                                  noStyle
                            >
                                <Checkbox>Remember me</Checkbox>
                            </Item>
                            <Item label={"isStaff"}>
                                <Switch
                                    defaultChecked={isStaff}
                                    onChange={checked => setIsStaff(checked)}
                                />
                            </Item>
                        </Item>

                        <Item>
                            <Button type="primary"
                                    htmlType="submit"
                                    className="login-form-button"
                                    onClick={onClick}
                            >
                                Sign In
                            </Button>
                        </Item>
                        <Item>
                            <Button
                                type="link"
                                className="login-form-forgot"
                                href="/reset-password"
                            >
                                Forgot your password?
                            </Button>
                        </Item>
                        <Item>
                            <div
                                className="register-form"
                            >
                                Don't have an account? &nbsp;
                                <a type="link"
                                   className="register-form-button"
                                   href="/user-create"
                                >
                                    Create one now
                                </a>
                            </div>

                        </Item>
                    </Form>
                </Card>

            </section>
            <footer className="login-footer">

            </footer>

        </div>
    );
}

export default UserLoginPage;